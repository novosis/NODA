<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vista/css/header.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <title>Document</title>
</head>
<body>
    <header>
        <div class="logo">
            <img src="vista/img/logo_a_color-removebg-preview.png" alt="">
        </div>
        <div class="usuario">

        </div>
        
    </header>
    <div class="container">
        <div class="perfil">
            <div class="cerrar">
                <p>x</p>
            </div>
            <div class="foto">
                <img src="vista/img/usuario.png" alt="">
            </div>
            <div>
            <h3>Nombre</h3>
            </div>
            <div class="opciones">
            <div class="editar">
                <a class="texto" href="../Controlador/Controlador.php?accion=editarPerfil">Editar Perfil</a>
            </div>
            <div class="signout">
                <a class="texto" href="cerrar.php">Cerrar Sesión</a>
            </div>
            </div>
        </div>
    </div>
    <script src="vista/js/ScriptPerfil.js"></script>
</body>
</html>