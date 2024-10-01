<?php

// Verifica si la sesión del usuario no está iniciada
if (!isset($_SESSION['usuario'])) {
    // Redirige al usuario a la página de inicio de sesión
    header('Location: ../login_registrar.php');
}

// Incluye el archivo de la cabecera
require_once 'header.view.php';
// Incluye el archivo del menú de navegación
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
        <!-- Contenedor del buscador -->
        <div class="Buscador">
            <!-- Icono de búsqueda -->
            <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador"> 
            <input type="text" id="buscar" placeholder="Buscar reservas..."> 
        </div>

        <!-- Contenedor donde se mostrarán las reservas del usuario -->
        <div id="reservas-container">
            <!-- Aquí se mostrarán las reservas del usuario -->
        </div>
    </div>

    <script src="vista/js/script-misReservas/scriptMisReservas.js"></script>
    <script src="vista/js/script-misReservas/buscador.js"></script>
</body>
</html>