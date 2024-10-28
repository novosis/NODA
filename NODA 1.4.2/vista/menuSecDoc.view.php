<?php

// Verifica si la sesión del usuario no está iniciada
if (!isset($_SESSION['usuario'])) {
    // Redirige al usuario a la página de inicio de sesión
    header('Location: ../index.php');
}

// Incluye el archivo de la cabecera
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

<!-- Div vacío para la sección de escuela -->
<div id="escuela"></div>
<!-- Div vacío para la sección de liceo -->
<div id="liceo"></div>

<!-- Contenedor para la opción de ver salas -->
<div id="blanco1">
    <div id="verSalas" onclick="location.href='agenda.php'">
        <!-- Imagen y texto para la opción de ver salas -->
        <img src="vista/img/verSalas.png" alt="">
        <h1>Ver Salas</h1>
    </div>
</div>

<!-- Contenedor para la opción de mis reservas -->
<div id="blanco2">
    <div id="misReservas" onclick="location.href='misreservas.php'">
        <img src="vista/img/misReservas.png" alt="">
        <h1>Mis Reservas</h1>
    </div>
</div>

</body>
</html>