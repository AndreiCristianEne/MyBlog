<?php

//init token
$token = $_POST['AUTH_TOKEN'] ? $_POST['AUTH_TOKEN'] : header("UNAVAILABLE RESOURCE", true, 400);
$verify = verifyJWT('sha256', $token, $secret);

if (!$verify) {
    header("COULD NOT AUTHENTICATE", true, 400);
    exit();
}

$token_data = explode('.', $token);
$payloadDecoded = base64UrlDecode($token_data[1]);
$user_id = json_decode($payloadDecoded)->user_id;

try {
    $loggedIn = false;

    $stmt = $conn->prepare("SELECT * FROM users WHERE user_id = :user_id LIMIT 1");
    $stmt->bindParam(':user_id', $user_id);
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

