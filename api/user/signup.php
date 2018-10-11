<?php
include "../../cors.php";
include "../../connect_mysql.php";

//    user should have name, password, email, profile data
if ($_POST["username"] && $_POST["password"] && $_POST["email"] && $_POST["avatar"]) {

    $email = $_POST["email"];
//    need to hash this before adding it to DB
    $password = $_POST["password"];
    $username = $_POST["username"];

//    unique user id for the DB
    $user_id = uniqid();

//    avatar data needs to be written in a jpg image
    $avatar_data = $_POST["avatar"];
//    avatar path should be something like username (stripped) + "_profile.jpg"
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

//    inserting the user in the database
    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, avatar_path, user_id)
    VALUES (:username, :email, :password, :avatar_path, :user_id)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':avatar_path', $avatar_path);
        $stmt->bindParam(':user_id', $user_id);

        // insert a row
        $stmt->execute();
        exit();
    } catch (Exception $e) {
        header("FAILED OPERATION", false, 500);
        exit();
    }

} else {
    header("NOT ENOUGH INFO", true, 400);
    exit();
}