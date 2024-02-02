<?php



function pagos($correo){


  // Comprueba los valores y asigna el pago correspondiente
    $pago = 0;

        if ($correo == "ruben@outlook.com") {
            $pago = 1000;
        } elseif ($correo == "alejandra@hotmail.com") {
            $pago = 2000;
        }else{
            $pago = 'no se encontro pago';
        }


    // Envía la respuesta como JSON
    header('Content-Type: application/json');
    return  $pago;

}


?>
