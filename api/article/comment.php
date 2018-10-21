<?php
include "../../cors.php";
include "../../session.php";
include "../../connect_mysql.php";
include "../../protected_session.php";

if ($_POST["COMMENT_DATA"] && $_POST['AUTH_TOKEN'] && $_POST['ARTICLE_ID']) {

    $comment_data = $_POST["COMMENT_DATA"];
    $article_id = $_POST["ARTICLE_ID"];
    $user_id = json_decode(base64_decode($_POST['AUTH_TOKEN']))->user_id;


    try {
        $stmt = $conn->prepare("INSERT INTO comments (comment, user_id, article_id) VALUES (:comment_data, :user_id, :article_id)");

        $stmt->bindParam(':comment_data', $comment_data);
        $stmt->bindParam(':article_id', $article_id);
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
