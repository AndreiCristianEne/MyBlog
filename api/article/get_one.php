<?php
include "../../cors.php";
include "../../connect_mysql.php";

$article_id = null;
if ($_GET['id']) {
    $article_id = $_GET['id'];
} else {
    header("REQUIRED PARAM ID MISSING", true, 400);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT * FROM articles WHERE id=:id LIMIT 1");
    $stmt->bindParam(':id', $article_id);
    $stmt->execute();

    $result = $stmt->fetchAll();
    foreach ($result as $article) {
        $jsonArticle = json_decode("{}");

        $jsonArticle->title = stripslashes($article['title']);
        $jsonArticle->article_data = $article['article_data'];
        $jsonArticle->user_id = $article['user_id'];
        $jsonArticle->id=$article['id'];

        echo json_encode($jsonArticle);
        exit();
    }

    header("ARTICLE NOT FOUND", false, 404);
    exit();
} catch (Exception $e) {
    header("FAILED OPERATION", false, 500);
    exit();
}