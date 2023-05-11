<?php

usleep(250000);
$arrayNicknames[] = "huichilopotzlli";
$arrayNicknames[] = "iker";
$arrayNicknames[] = "wenceslao";
$arrayNicknames[] = "aixa";
$arrayNicknames[] = "deyanira";
$arrayNicknames[] = "hermelinda";
$arrayNicknames[] = "ametz";
$arrayNicknames[] = "abundio";
$arrayNicknames[] = "nicanor";
$arrayNicknames[] = "yirla";
$arrayNicknames[] = "kristen";
$arrayNicknames[] = "prisma";
$arrayNicknames[] = "antero";
$arrayNicknames[] = "confucio";
$arrayNicknames[] = "petronila";
$arrayNicknames[] = "noelle";
$arrayNicknames[] = "galdino";
$arrayNicknames[] = "nicasio";
$arrayNicknames[] = "viliulfo";
$arrayNicknames[] = "cleopatra";

$nickBuscar = $_REQUEST["nickname"];

$coincidencies = "";
$igual = false;

// trim — Elimina espacio en blanco (u otro tipo de caracteres) 
// del inicio y el final de la cadena

/*
Example#1 Ejemplo de stristr()

<?php
  $email = 'USER@EXAMPLE.com';
  echo stristr($email, 'e');
// Salida: ER@EXAMPLE.com
?>
*/

if (trim($nickBuscar) != "") {
    $nickBuscar = strtolower($nickBuscar);
    $llargada = strlen($nickBuscar);
    foreach ($arrayNicknames as $nick) {
        if (stristr($nickBuscar, substr($nick, 0, $llargada))) {
            if ($coincidencies === "") {
                $coincidencies = $nick;
            } else {
                $coincidencies .= ", $nick";
            }
        }
        // strcmp — Comparación de string segura a nivel binario
        if (strcmp($nickBuscar, strtolower($nick)) == 0) {
            $igual = true;
        }
    }
}

if ($igual) {
    echo 1;
} else if ($coincidencies == "") {
    echo 2;
} else {
    echo $coincidencies;
}
?>