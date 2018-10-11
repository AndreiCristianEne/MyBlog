<?php
//$servername = $_ENV["MYSQL_HOST"]
//$username = $_ENV["MYSQL_USERNAME"]
//$password = $_ENV["MYSQL_PASSWORD"]
//$database = $_ENV["MYSQL_DATABASE"]

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
