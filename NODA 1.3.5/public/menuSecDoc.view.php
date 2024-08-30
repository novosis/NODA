<?php

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}

require_once 'header.view.php';

?>

<!DOCTYPE html>
<html>
<head>
    <title>Menu secundaria</title>
    <link rel="stylesheet" href="vista/css/style-menu/styleMenuSecDoc.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
</head>
<body>

<div id="escuela"></div>
<div id="liceo"></div>

<div id="blanco1">
    <div id="verSalas" onclick="location.href='agenda.php'">
        <img src="vista/img/verSalas.png" alt="">
        <h1>ver Salas</h1>
    </div>
</div>

<div id="blanco2">
    <div id="misReservas" onclick="location.href='misreservas.php'">
        <img src="vista/img/misReservas.png" alt="">
        <h1>Mis Reservas</h1>
    </div>
</div>

</body>
</html>