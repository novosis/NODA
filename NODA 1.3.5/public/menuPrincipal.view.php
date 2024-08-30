<?php 

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}

require_once 'header.view.php';

$cargo = $_SESSION['cargo'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vista/css/style-menu/styleMenuPrincipal.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <script src="https://kit.fontawesome.com/1aaabd23d9.js" crossorigin="anonymous"></script>
    <title>Menu secundaria</title>
</head>
<body>

    <div id="blanco1">
        <div id="primaria" onclick="location.href='menuEnDesarrollo.php'">
            <img src="vista/img/primaria.png" alt="">
            <h1>Primaria</h1>
        </div>
    </div>

    <div id="blanco2">
        <div id="secundaria">
            <img src="vista/img/secundaria.png" alt="">
            <h1>Secundaria</h1>
        </div>
    </div>
    <div class="logo1">
        <img src="vista/img/novoBlanco.png" alt="" class="novosis">
    </div>
    <div class="logo2">
        <img src="vista/img/impulso.png" alt="" class="impulso">    
    </div>
    <script>
        document.getElementById('secundaria').addEventListener('click', function() {
            // Aquí verificamos si el usuario tiene el cargo "operativo"
            <?php if($cargo === 'operativo'): ?>
                // Si es operativo, redirigimos al menú específico para operativos
                window.location.href = 'menuoperativo.php';
            <?php elseif($cargo === 'lider'): ?>
                // Si es lider, redirigimos al menú específico para lider
                window.location.href = 'menulider.php';
            <?php else: ?>
                // Si es otro cargo, redirigimos al menú específico para los demas cargos
                window.location.href = 'menudoc.php';
            <?php endif; ?>
        });
    </script>

</body>
</html>

