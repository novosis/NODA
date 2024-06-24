<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../Public/css/StyleLogin.css">
    <title>NODA-LOGIN</title>
</head>
<body>
    <div class="Container">
    <!-- action="..//validarLogin.php" method="POST" -->
        <div class="DivLogin">
            <h1 id="titulo">Login</h1>
            <form id="form" >
                <input id="usuario" type="email" name="email" placeholder="E-mail" required>
                <input id="password" type="password" name="password" placeholder="Password" required>
                <a href="..." id="olvidado">He olvidado mi contraseña</a>
                <button id="ingresar">Ingresar</button>
            </form>
        </div>
        <div class="DivSignUp">
            <h1 id="titulo2">Sign Up</h1>
            <form id="form2" action="../php/validarRegistro.php" method="POST">
                <input id="nombre" type="text" name="nombre" placeholder="Nombre" required>
                <input id="apellido" type="text" name="apellido" placeholder="Apellido" required>
                <input id="usuario2" type="email" name="email" placeholder="E-mail" required>
                <select id="cargo" type="option" name="cargo" placeholder="cargo" required>
                    <option value="" id="opcion1" disabled selected hidden>Cargo</option>
                    <option value="1">Docente</option>
                    <option value="2">EVI</option>
                    <option value="3">Lider</option>
                    <option value="4">Director</option>
                    <option value="5">Operativo</option>

                </select>
                <input id="password2" type="password" name="password" placeholder="Password" required>
                <button id="registrarse">Sign Up</button>
            </form>
        
    </div>
    <div class="SignUp" id="signup">
        <img src="../Public/img/logo_a_color-removebg-preview.png" class="logo">
        <h1 class="TituloMov" id="h1">Sign Up</h1>
    </div>
    <img src="../Public/img/candado.png" class="candado">
    <img src="../Public/img/usuario.png" class="usuario">
    <img src="../Public/img/candado.png" class="candado2">
    <img src="../Public/img/usuario.png" class="usuario2">
    <img src="../Public/img/cargo.png" class="cargo">
    <script src="../Public/js/ScriptLogin.js"></script>
    <script src="../Public/js/ValidarLogin.js"></script>
</body>
</html>
