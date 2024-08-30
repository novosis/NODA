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
    <title>Visualizar Reservas</title> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap"> 
    <link rel="stylesheet" href="vista/css/style-menu-reservas/StyleReservas.css">
</head>
<body>
    <!-- Contenedor del buscador -->
    <div class="Buscador">
        <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador"> 
        <input type="text" id="buscar" placeholder="Buscar reservas..."> 
    </div>

    <div class="Container">
        <!-- Aquí se generarán dinámicamente las salas existentes y nuevas -->
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="vista/js/script-reservas/buscador.js"></script>
    <script src="vista/js/script-reservas/scriptResevas.js"></script>
</body>
</html>
