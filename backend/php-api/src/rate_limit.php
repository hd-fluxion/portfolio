<?php

declare(strict_types=1);

function rate_limit_or_429(array $config, string $clientId): void
{
    $limit = $config['rate_limit_per_hour'] ?? 20;
    if ($limit <= 0) {
        return;
    }

    $hourKey = date('YmdH');
    $hash = hash('sha256', $clientId . $hourKey);
    $path = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'rate_' . $hash . '.json';

    $data = [
        'count' => 0,
        'reset_at' => strtotime('+1 hour'),
    ];

    if (file_exists($path)) {
        $raw = file_get_contents($path);
        if ($raw !== false) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $data = array_merge($data, $decoded);
            }
        }
    }

    $data['count']++;

    if ($data['count'] > $limit) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Rate limit exceeded',
            'reset_at' => $data['reset_at'],
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    file_put_contents($path, json_encode($data));
}
