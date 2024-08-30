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
        <title>Perfiles</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
        <link rel="stylesheet" href="vista/css/style-menu-usuarios/usuarios.css">
    </head>
        <body>

            <form action="usuarios.php" method="post" id="formu">
                <input type="email" name="email" id="Email">
            </form>

            <button id="agregar"></button>

            <div id="divchico"></div>

            <div class="buscador">
                <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador">
                <input type="text" id="buscar" placeholder="Buscar usuarios...">
            </div>

            <div id="contenedor-tarjetas"></div>

            <div id="data" class="card-container">
                <!-- aca se cargan las tarjetas -->
            </div>

            <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
            <script type="text/javascript" src="vista/js/script-menu-usuarios/functions.js"></script>
        </body>
</html>