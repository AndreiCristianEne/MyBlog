<?php
include "../../cors.php";
include "../../session.php";
include "../../connect_mysql.php";
include "../../protected_session.php";

if ($_POST["title"] && $_POST["article_data"] && $_POST['AUTH_TOKEN']) {

    $article_data = $_POST["article_data"];
    $article_title = addslashes($_POST["title"]);
    $user_id = json_decode(base64_decode($_POST['AUTH_TOKEN']))->user_id;


    try {
        $stmt = $conn->prepare("INSERT INTO articles (title, user_id, article_data) VALUES (:title, :user_id, :article_data)");

        $stmt->bindParam(':title', $article_title);
        $stmt->bindParam(':article_data', $article_data);
        $stmt->bindParam(':user_id', $user_id);

        // insert a row
        $stmt->execute();
        exit();
    } catch (Exception $e) {
        header("FAILED OPERATION", false, 500);
        exit();
    }

} else {
    header("NOT ENOUGH INFO TO ADD ARTICLE", true, 400);
    exit();
}

