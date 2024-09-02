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
    <title>Perfiles</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <link rel="stylesheet" href="vista/css/style-menu-usuarios/usuarios.css">
</head>
<body>

    <!-- Formulario para agregar un nuevo usuario -->
    <form action="usuarios.php" method="post" id="formu">
        <input type="email" name="email" id="Email">
    </form>

    <!-- Botón para agregar un nuevo usuario -->
    <button id="agregar"></button>

    <!-- Div para contenido adicional -->
    <div id="divchico"></div>

    <!-- Contenedor del buscador -->
    <div class="buscador">
        <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador">
        <input type="text" id="buscar" placeholder="Buscar usuarios...">
    </div>

    <!-- Contenedor para cargar dinámicamente las tarjetas de usuarios -->
    <div id="data" class="card-container">
        <!-- Aquí se cargan las tarjetas -->
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script type="text/javascript" src="vista/js/script-menu-usuarios/functions.js"></script>
</body>
</html>