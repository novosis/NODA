
<?php

// Verifica si la sesión del usuario no está iniciada
if (!isset($_SESSION['usuario'])) {
    // Redirige al usuario a la página de inicio de sesión
    header('Location: ../login_registrar.php');
}

// Obtiene el cargo del usuario desde la sesión
$cargo = $_SESSION['cargo'];

?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
        <link rel="stylesheet" href="vista/css/style-menu-navegacion/styleMenuNavegacion.css">
    </head>
        <body>

        <div class="containerMenu">
    <div id="opciones">
        <!-- Opción del menú para ir al menú principal -->
        <div class="div" onclick="location.href='menuprincipal.php'">
            <img src="vista/img/home.png" alt="" id="menuPrincipal">
        </div>

        <!-- Opción del menú para ver las salas -->
        <div class="div" onclick="location.href='agenda.php'">
            <img src="vista/img/verSalas.png" alt="" id="menuSalas">
        </div>

        <!-- Opción del menú para hacer reservas, visible solo para usuarios con cargo 'operativo' o 'lider' -->
        <?php if($cargo === 'operativo' || $cargo === 'lider'): ?>
            <div class="div" onclick="location.href='reserva.php'">
                <img src="vista/img/reservas.png" alt="" id="menuReservas">
            </div>
        <?php endif; ?>

        <!-- Opción del menú para ver las reservas del usuario -->
        <div class="div" onclick="location.href='misreservas.php'">
            <img src="vista/img/misReservas.png" alt="" id="menuMisReservas">
        </div>

        <!-- Opción del menú para ver perfiles, visible solo para usuarios con cargo 'operativo' -->
        <?php if($cargo === 'operativo'): ?>
            <div class="div" onclick="location.href='perfil.php'">
                <img src="vista/img/verUsuario.png" alt="" id="menuPerfiles">
            </div>
        <?php endif; ?>
    </div>
</div>

</body>
</html>


