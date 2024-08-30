<?php

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}

require_once 'header.view.php';

?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Secundaria</title>
    <link rel="stylesheet" href="vista/css/style-menu/styleMenuSecLider.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
</head>
<body>

    <div class="container">
        <div class="menu" id="menu1">
            <div class="left">
                <div class="leftin" onclick="location.href='Agenda.php'">
                    <img src="vista/img/verSalas.png" alt="" class="imagenMenu">
                    <h1>Ver salas</h1>
                </div>
            </div>

            <div class="bottom">
                <div class="bottomin" onclick="location.href='reserva.php'">
                    <img src="vista/img/reservas.png" alt="" class="imagenMenu" >
                    <h1>Reservas</h1>
                </div>
            </div>

            <div class="right">
                <div class="rightin" onclick="location.href='misreservas.php'">
                    <img src="vista/img/misReservas.png" alt="" class="imagenMenu" >
                    <h1>Mis reservas</h1>
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>
