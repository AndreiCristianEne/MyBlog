<?php
include("../../cors.php");
include("../../connect_mysql.php");

//    user should have name, password, email, profile data
if ($_POST["username"] && $_POST["password"] && $_POST["email"] && $_POST["avatar"]) {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $username = $_POST["username"];
    $avatar_data = $_POST["avatar"];
    $avatar_path = "profile.jpg";


    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("INVALID EMAIL ADDRESS", true, 400);
        exit();
    }

    if (strlen($password) < 6) {
        header("INVALID PASSWORD", true, 400);
        exit();
    }

    if (strlen($username) < 4) {
        header("INVALID USERNAME", true, 400);
        exit();
    }

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, avatar_path)
    VALUES (:username, :email, :password, :avatar_path)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':avatar_path', $avatar_path);

        // insert a row
        $stmt->execute();
    } catch (Exception $e) {
        header("FAILED OPERATION", false, 500);
        exit();
    }


    exit();
} else {
    header("NOT ENOUGH INFO", true, 400);
    exit();
}