<?php
declare(strict_types=1);

$storageFile = __DIR__ . '/storage/site.html';
$templateFile = __DIR__ . '/site.template.html';

$sourceFile = file_exists($storageFile) ? $storageFile : $templateFile;

if (!file_exists($sourceFile)) {
    http_response_code(500);
    echo 'Site template is missing.';
    exit;
}

header('Content-Type: text/html; charset=UTF-8');
readfile($sourceFile);

