<?php
//$servername = $_ENV["MYSQL_HOST"] || 'localhost';
//$username = $_ENV["MYSQL_USERNAME"] || 'root';
//$password = $_ENV["MYSQL_PASSWORD"] || 'root';
//$database = $_ENV["MYSQL_DATABASE"] || 'blog';

$servername = 'localhost';
$username = 'root';
$password = 'root';
$database = 'blog';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    die($e->getMessage());
}
