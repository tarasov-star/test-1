<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    json_response([
        'ok' => true,
        'authenticated' => is_authenticated(),
        'username' => is_authenticated() ? (string) ($_SESSION['admin_username'] ?? '') : '',
    ]);
}

require_method('POST');

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    json_response(['ok' => false, 'error' => 'Invalid payload.'], 422);
}

$username = trim((string) ($payload['username'] ?? ''));
$password = (string) ($payload['password'] ?? '');
$expectedUser = (string) config_value('admin_username', '');
$passwordHash = (string) config_value('admin_password_hash', '');

if ($expectedUser === '' || $passwordHash === '') {
    json_response(['ok' => false, 'error' => 'Admin is not configured on the server yet.'], 500);
}

if ($username !== $expectedUser || !password_verify($password, $passwordHash)) {
    json_response(['ok' => false, 'error' => 'Invalid credentials.'], 401);
}

$_SESSION['admin_authenticated'] = true;
$_SESSION['admin_username'] = $username;

json_response(['ok' => true, 'username' => $username]);

