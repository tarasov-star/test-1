<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    json_response([
        'ok' => true,
        'html' => current_site_html(),
        'authenticated' => is_authenticated(),
    ]);
}

require_method('POST');
require_auth();

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload) || !isset($payload['html']) || !is_string($payload['html'])) {
    json_response(['ok' => false, 'error' => 'Invalid payload.'], 422);
}

save_site_html($payload['html']);

json_response(['ok' => true]);

