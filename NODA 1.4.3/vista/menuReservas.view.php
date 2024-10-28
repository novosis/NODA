<?php

// Verifica si la sesión del usuario no está iniciada
if (!isset($_SESSION['usuario'])) {
    // Redirige al usuario a la página de inicio de sesión
    header('Location: ../index.php');
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
    <title>Visualizar Reservas</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <link rel="stylesheet" href="vista/css/style-menu-reservas/StyleReservas.css">
</head>
<body>
    <!-- Contenedor del buscador y filtro -->
    <div class="BuscadorFiltro">
        <!-- Contenedor del buscador -->
        <div class="Buscador">
            <!-- Icono de búsqueda -->
            <img src="vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador">
            <!-- Campo de texto para buscar reservas -->
            <input type="text" id="buscar" placeholder="Buscar reservas...">
        </div>

        <!-- Contenedor del filtro -->
        <div class="Filtro">
            <!-- Selector para ordenar las reservas -->
            <select id="ordenar">
                <option value="az">Nombre A-Z</option>
                <option value="za">Nombre Z-A</option>
            </select>
        </div>
    </div>

    <div class="Container">
        <!-- Aquí se generarán dinámicamente las salas existentes y nuevas -->
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="vista/js/script-reservas/buscador.js"></script>
    <script src="vista/js/script-reservas/scriptResevas.js"></script>
</body>
</html>