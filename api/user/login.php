<?PHP
include "../../cors.php";
include "../../session.php";
include "../../connect_mysql.php";
include "../../jwt.php";

if ($_POST["email"] && $_POST["password"]) {

    $email = $_POST["email"];
    $password = $_POST["password"];

    try {
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = :email AND password = :password LIMIT 1");
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $email);

        $stmt->execute();

        $result = $stmt->fetchAll();
        foreach ($result as $user) {
            $header = [
                "alg" => "HS256",
                "typ" => "JWT"
            ];

            $payload = [
                "user_id" => $user['user_id']
            ];

            $token = generateJWT('sha256', $header, $payload, $secret);
            echo $token;
            exit();
        }

        header("COULD NOT AUTHENTICATE", true, 400);
        exit();
    } catch (Exception $e) {
        header("FAILED OPERATION", false, 500);
        exit();
    }

} else {
    header("NOT ENOUGH INFO TO AUTHENTICATE", true, 400);
    exit();
}

//basics for stuff
