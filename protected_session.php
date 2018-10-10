<?php
include "./connect_mysql.php";
include "./session.php";

//init token
$headers = apache_request_headers();
$token = $_SESSION['AUTH_TOKEN'] ? $_SESSION['AUTH_TOKEN'] : $_POST['AUTH_TOKEN'] ? $_POST['AUTH_TOKEN'] : header("UNAVAILABLE RESOURCE", true, 400) && exit();
$signature = base64_decode($token);


try {
    $loggedIn = false;

    $stmt = $conn->prepare("SELECT * FROM users WHERE user_id = :user_id LIMIT 1");
    $stmt->bindParam(':user_id', json_decode($signature)->user_id);

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

