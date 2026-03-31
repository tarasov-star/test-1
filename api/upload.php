<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require_method('POST');
require_auth();

if (empty($_FILES['file']) || !is_array($_FILES['file'])) {
    json_response(['ok' => false, 'error' => 'No file uploaded.'], 422);
}

$file = $_FILES['file'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(['ok' => false, 'error' => 'Upload failed.'], 422);
}

$tmpName = (string) $file['tmp_name'];
$originalName = (string) $file['name'];
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

if (!in_array($extension, $allowed, true)) {
    json_response(['ok' => false, 'error' => 'Unsupported image format.'], 422);
}

ensure_directory(uploads_dir());

$filename = date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $extension;
$target = uploads_dir() . '/' . $filename;

if (!move_uploaded_file($tmpName, $target)) {
    json_response(['ok' => false, 'error' => 'Could not move uploaded file.'], 500);
}

json_response([
    'ok' => true,
    'url' => '/storage/uploads/' . $filename,
]);

