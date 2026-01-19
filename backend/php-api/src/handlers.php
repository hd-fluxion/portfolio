<?php

declare(strict_types=1);

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
}

function handle_generate_outline(array $input, array $config): void
{
    respond([
        'success' => true,
        'data' => [
            'outline' => [
                'はじめに',
                '課題整理',
                '解決策の設計',
                '導入ステップ',
                'まとめ',
            ],
            'demo' => $config['demo_mode'],
        ],
    ]);
}

function handle_generate_article(array $input, array $config): void
{
    respond([
        'success' => true,
        'data' => [
            'title' => ($input['keyword'] ?? 'AI活用') . 'の進め方',
            'body' => "H2: はじめに\nH3: 背景\n\nH2: 施策\nH3: 自動化\n\nH2: まとめ",
            'demo' => $config['demo_mode'],
        ],
    ]);
}

function handle_refine(array $input, array $config): void
{
    $text = $input['text'] ?? '';
    $mode = $input['mode'] ?? '調整';
    respond([
        'success' => true,
        'data' => [
            'text' => trim($text) . "\n\n[{$mode}] の視点で整形しました（デモ）。",
            'demo' => $config['demo_mode'],
        ],
    ]);
}

function handle_generate_image(array $input, array $config): void
{
    respond([
        'success' => true,
        'data' => [
            'url' => 'https://placehold.co/800x450?text=Demo+Image',
            'alt' => 'Demo image',
            'demo' => $config['demo_mode'],
        ],
    ]);
}

function handle_wp_post(array $input, array $config): void
{
    respond([
        'success' => true,
        'data' => [
            'posted' => true,
            'post_id' => 'demo-12345',
            'demo' => $config['demo_mode'],
        ],
    ]);
}
