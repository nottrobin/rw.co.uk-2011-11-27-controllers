<?php

// Add php-fastcgi_modules to include path
set_include_path(get_include_path() . PATH_SEPARATOR . './php_modules');

$host = $_SERVER['HTTP_HOST'];
try {
    require('sites/'.$host.'.php');
} catch (Exception $e) {
    header("HTTP/1.1 500 Server error");
    header('Content-type: text/plain');
    echo "Site module error:\n" . $e;
    trigger_error(
        date('Y-m-d H:m:s') . ": Site module error: " . $e,
        E_USER_WARNING
    );
}

