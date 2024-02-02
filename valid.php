<?php

// Simular una lista de tokens permitidos
$tokensPermitidos = ["token1", "token2", "token3"];

// Asumiendo que recibes el token por POST como JSON
$json = file_get_contents('php://input');
$data = json_decode($json);
$token = $data->token ?? '';

// Validar el token
if (in_array($token, $tokensPermitidos)) {
    echo json_encode(['isValid' => true,'data' => 'portal1']);
} else {
    echo json_encode(['isValid' => false]);
}
?>
