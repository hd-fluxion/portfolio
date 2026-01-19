<?php

declare(strict_types=1);

function load_env(string $path): void
{
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) {
            continue;
        }
        [$key, $value] = array_pad(explode('=', $line, 2), 2, null);
        if ($key !== null && $value !== null) {
            putenv(trim($key) . '=' . trim($value));
        }
    }
}

function env_value(string $key, string $default = ''): string
{
    $value = getenv($key);
    if ($value === false || $value === '') {
        return $default;
    }
    return $value;
}

$envPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.env';
load_env($envPath);

$config = [
    'demo_mode' => filter_var(env_value('DEMO_MODE', 'true'), FILTER_VALIDATE_BOOL),
    'rate_limit_per_hour' => (int) env_value('RATE_LIMIT_PER_HOUR', '20'),
    'wp_base_url' => env_value('WP_BASE_URL', ''),
    'wp_username' => env_value('WP_USERNAME', ''),
    'wp_app_password' => env_value('WP_APP_PASSWORD', ''),
    'openai_api_key' => env_value('OPENAI_API_KEY', ''),
];
