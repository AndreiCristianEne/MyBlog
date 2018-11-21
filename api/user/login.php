<?PHP
include "../../cors.php";
include "../../session.php";
include "../../connect_mysql.php";
include "../../jwt.php";

if ($_POST["email"] && $_POST["password"]) {

    $email = $_POST["email"];
    $password = $_POST["password"];

    try {
        $stmt = $conn->prepare("SELECT password, user_id, forgot_password FROM users WHERE email = :email LIMIT 1");
        $stmt->bindParam(':email', $email);

        $stmt->execute();
        $result = $stmt->fetchAll();

        foreach ($result as $user) {
            if (!password_verify($password, $user['password'])) {
                header("COULD NOT AUTHENTICATE", true, 400);
                exit();
            }
            $header = [
                "alg" => "HS256",
                "typ" => "JWT"
            ];

            $payload = [
                "user_id" => $user['user_id']
            ];

            $requestChangePassword = false;

            if ($user['forgot_password'] == 1) {
                $requestChangePassword = true;
            }

            $token = generateJWT('sha256', $header, $payload, $secret);
            $response = new stdClass();
            $response->token = $token;
            $response->requestChangePassword = $requestChangePassword;
            echo json_encode($response);
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
