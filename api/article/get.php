<?php
include "../../cors.php";
include "../../connect_mysql.php";

try {
    $articles = [];
    $stmt = $conn->prepare("SELECT * FROM articles");

    $stmt->execute();

    $result = $stmt->fetchAll();
    foreach ($result as $article) {
        $jsonArticle = json_decode("{}");

        $jsonArticle->title = stripslashes($article['title']);
        $jsonArticle->article_data = $article['article_data'];
        $jsonArticle->user_id = $article['user_id'];
        $jsonArticle->id=$article['id'];

        array_push($articles, $jsonArticle);
    }

    echo json_encode($articles);

} catch (Exception $e) {
    header("FAILED OPERATION", false, 500);
    exit();
}