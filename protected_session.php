<?php

//init token
$token = $_SESSION['AUTH_TOKEN'] ? $_SESSION['AUTH_TOKEN'] : $_POST['AUTH_TOKEN'] ? $_POST['AUTH_TOKEN'] : header("UNAVAILABLE RESOURCE", true, 400);
$signature = json_decode(base64_decode($token))->user_id;

try {
    $loggedIn = false;

    $stmt = $conn->prepare("SELECT * FROM users WHERE user_id = :user_id LIMIT 1");
    $stmt->bindParam(':user_id', $signature);

    $stmt->execute();

    $result = $stmt->fetchAll();
    foreach ($result as $user) {
        $loggedIn = true;
    }

    if (!$loggedIn) {
        header("COULD NOT AUTHENTICATE", true, 400);
        exit();
    }

} catch (Exception $e) {
    header("FAILED TO AUTHENTICATE", false, 500);
    exit();
}

