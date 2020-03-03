<?php
function base64UrlEncode($data)
{
    // replace +/ with -_
    $urlSafeData = strtr(base64_encode($data), '+/', '-_');
    // trims the "=" from the right of the string
    return rtrim($urlSafeData, '=');
}

function base64UrlDecode($data)
{
    // replace -_ with +/
    $urlUnsafeData = strtr($data, '-_', '+/');
    // counts the letters remaining until length 64 (if the length of the string is 40, it puts 24 "=" at the end)
    $paddedData = str_pad($urlUnsafeData, strlen($data) % 4, '=', STR_PAD_RIGHT);

    return base64_decode($paddedData);
}

// Highly confidential
$secret = "LuvTw5pYngWvDsn6grggImBQhdjeD/T+QRHwpSikyQs=";
//method used to essentially create the token while encoding the sensitive data about the user
function generateJWT(
    $algo,
    $header,
    $payload,
    $secret
) {
    // json_encode from object to string
    $headerEncoded = base64UrlEncode(json_encode($header));
    $payloadEncoded = base64UrlEncode(json_encode($payload));
    $dataEncoded = "$headerEncoded.$payloadEncoded";
    $rawSignature = hash_hmac($algo, $dataEncoded, $secret, true); // outputs raw binary data
    $signatureEncoded = base64UrlEncode($rawSignature);
    $jwt = "$dataEncoded.$signatureEncoded";

    return $jwt;
}
//verifies the signature of the token, returns a boolean
function verifyJWT($algo, $jwt, $secret)
{
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);
    $dataEncoded = "$headerEncoded.$payloadEncoded";
    // decode the token's signature
    $signature = base64UrlDecode($signatureEncoded);
    // make a new signature, you will later compare them
    $rawSignature = hash_hmac($algo, $dataEncoded, $secret, true);
    // header = A payload = B signature = C, if there is something like A B D or A D C, this method will know if changes were made
    return hash_equals($rawSignature, $signature);
}
