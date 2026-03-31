<?php
declare(strict_types=1);

session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);

session_start();

header('Content-Type: application/json; charset=UTF-8');

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : [];

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function require_method(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        json_response(['ok' => false, 'error' => 'Method not allowed.'], 405);
    }
}

function config_value(string $key, mixed $default = null): mixed
{
    global $config;
    return $config[$key] ?? $default;
}

function is_authenticated(): bool
{
    return !empty($_SESSION['admin_authenticated']);
}

function require_auth(): void
{
    if (!is_authenticated()) {
        json_response(['ok' => false, 'error' => 'Unauthorized.'], 401);
    }
}

function storage_dir(): string
{
    return dirname(__DIR__) . '/storage';
}

function uploads_dir(): string
{
    return storage_dir() . '/uploads';
}

function active_site_file(): string
{
    return storage_dir() . '/site.html';
}

function template_site_file(): string
{
    return dirname(__DIR__) . '/site.template.html';
}

function ensure_directory(string $path): void
{
    if (!is_dir($path) && !mkdir($path, 0775, true) && !is_dir($path)) {
        json_response(['ok' => false, 'error' => 'Cannot create storage directory.'], 500);
    }
}

function current_site_html(): string
{
    $active = active_site_file();
    $template = template_site_file();

    if (file_exists($active)) {
        return (string) file_get_contents($active);
    }

    if (file_exists($template)) {
        return (string) file_get_contents($template);
    }

    json_response(['ok' => false, 'error' => 'Site template is missing.'], 500);
}

function save_site_html(string $html): void
{
    ensure_directory(storage_dir());

    if (trim($html) === '') {
        json_response(['ok' => false, 'error' => 'HTML content is empty.'], 422);
    }

    $bytes = file_put_contents(active_site_file(), $html);
    if ($bytes === false) {
        json_response(['ok' => false, 'error' => 'Failed to save site.'], 500);
    }
}

