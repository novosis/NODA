<?php 
    require_once 'header.view.php';

    $cargo = $_SESSION['cargo'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vista/css/MenuPrincipal.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <script src="https://kit.fontawesome.com/1aaabd23d9.js" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>

    <button class="Escuela">
        <h1>Escuela</h1>
    </button>

    
    
    <button class="Liceo" id="btnLiceo">
        <h1>Liceo</h1>
    </button>

   <script>
        document.getElementById('btnLiceo').addEventListener('click', function() {
            // Aquí verificamos si el usuario tiene el cargo "operativo"
            <?php if($cargo === 'operativo'): ?>
            
                // Si es operativo, redirigimos al menú específico para operativos
                window.location.href = 'public/menuSecOperativo.html';
            
                // Aquí verificamos si el usuario tiene el cargo "lider"
            <?php elseif($cargo === 'lider'): ?>
            
                // Si es lider, redirigimos al menú específico para lider
                window.location.href = 'public/menuSecLider.html';
            <?php else: ?>
            
                // Si es otro cargo, redirigimos al menú específico para los demas cargos
                window.location.href = 'public/menuSecDoc.html';
            <?php endif; ?>
        });
    </script>
</body>
</html>