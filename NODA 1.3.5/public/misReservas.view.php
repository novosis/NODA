<?php

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}

require_once 'header.view.php';
require_once 'menuNavegacion.view.php';

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Reservas</title>
    <link rel="stylesheet" href="vista/css/style-misReservas/styleMisReservas.css">
</head>
<body>
    <div class="Container">

    <div class="Buscador">
        <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador"> 
        <input type="text" id="buscar" placeholder="Buscar reservas..."> 
    </div>

        <div id="reservas-container">
            <!-- Aquí se mostrarán las reservas del usuario -->
        </div>
    </div>
    <script src="vista/js/script-misReservas/scriptMisReservas.js"></script>
    <script src="vista/js/script-misReservas/buscador.js"></script>
</body>
</html>
