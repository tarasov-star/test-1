<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require_method('POST');

$_SESSION = [];
session_destroy();

json_response(['ok' => true]);

