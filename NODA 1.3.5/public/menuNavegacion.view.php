
<?php

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}


$cargo = $_SESSION['cargo'];

?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <title>tarjetas</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
        <link rel="stylesheet" href="vista/css/style-menu-navegacion/styleMenuNavegacion.css">
    </head>
        <body>

<div class="containerMenu">
            <div id="opciones">
            <div class="div" onclick="location.href='menuprincipal.php'">
                        <img src="vista/img/home.png" alt="" id="menuPrincipal">
                    </div>

                    <div class="div" onclick="location.href='agenda.php'">
                        <img src="vista/img/verSalas.png" alt="" id="menuSalas">
                    </div>

                    
                    <?php if($cargo === 'operativo' || $cargo === 'lider'): ?>
                        <div class="div" onclick="location.href='reserva.php'">
                            <img src="vista/img/reservas.png" alt="" id="menuReservas">
                        </div>
                    <?php endif; ?>


                    <div class="div" onclick="location.href='misreservas.php'">
                        <img src="vista/img/misReservas.png" alt="" id="menuMisReservas">
                    </div>

                    <?php if($cargo === 'operativo'): ?>
                        <div class="div" onclick="location.href='perfil.php'">
                            <img src="vista/img/verUsuario.png" alt="" id="menuPerfiles">
                        </div>
                    <?php endif; ?>
            </div>
            </div>
        </body>
</html>


