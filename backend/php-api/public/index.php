<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../src/config.php';
require_once __DIR__ . '/../src/rate_limit.php';
require_once __DIR__ . '/../src/handlers.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$clientId = ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . ($_SERVER['HTTP_USER_AGENT'] ?? 'ua');
rate_limit_or_429($config, $clientId);

if ($path === '/api/health' && $method === 'GET') {
    respond(['success' => true, 'data' => ['status' => 'ok']]);
    exit;
}

if ($method !== 'POST') {
    respond(['success' => false, 'error' => 'Method not allowed'], 405);
    exit;
}

$raw = file_get_contents('php://input');
$input = [];
if ($raw !== false && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond(['success' => false, 'error' => 'Invalid JSON'], 400);
        exit;
    }
    $input = $decoded;
}

switch ($path) {
    case '/api/generate-outline':
        handle_generate_outline($input, $config);
        break;
    case '/api/generate-article':
        handle_generate_article($input, $config);
        break;
    case '/api/refine':
        handle_refine($input, $config);
        break;
    case '/api/generate-image':
        handle_generate_image($input, $config);
        break;
    case '/api/wp-post':
        handle_wp_post($input, $config);
        break;
    default:
        respond(['success' => false, 'error' => 'Not found'], 404);
        break;
}
