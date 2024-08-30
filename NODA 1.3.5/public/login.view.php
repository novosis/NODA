<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    <link rel="stylesheet" href="vista/css/StyleLogin.css">
    <script src="https://kit.fontawesome.com/1aaabd23d9.js" crossorigin="anonymous"></script>
    <title>NODA-LOGIN</title>
</head>
<body>

    <div class="Container">
        <div class="DivLogin">
            <h1 id="titulo">Login</h1>
            <form id="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" name="login">
                
                <input id="usuario" type="email" name="email" placeholder="E-mail" required>
                <input id="password" type="password" name="password" placeholder="Password" required>
                <input type="hidden" name="action" value="login"> <!-- Campo oculto para login -->
                <a href="..." id="olvidado">He olvidado mi contraseña</a>
                <button id="ingresar" type="submit">Ingresar</button>
            </form>
        </div>
        <div class="DivSignUp">
            <h1 id="titulo2">Sign Up</h1>
            <form id="form2" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" name="login">
                <input id="nombre" type="text" name="nombre" placeholder="Nombre" required>
                <input id="apellido" type="text" name="apellido" placeholder="Apellido" required>
                <input id="usuario2" type="email" name="email" placeholder="E-mail" required>
                <select id="cargo" type="text" name="cargo" placeholder="cargo" required>
                    <option value="" id="opcion1" disabled selected hidden>Cargo</option>
                    <option value="docente">Docente</option>
                    <option value="ebi">EBI</option>
                    <option value="lider">Lider</option>
                    <option value="director">Director</option>
                    <option value="operativo">Operativo</option>

                </select>
                <input id="password2" type="password" name="password" placeholder="Password" required>
                <input type="hidden" name="action" value="signup"> <!-- Campo oculto para sign up -->
                <button id="registrarse" type="submit">Registrar</button>
            </form>
    </div>


    <div class="SignUp" id="signup">
        <img src="vista/img/logo_a_color-removebg-preview.png" class="logo">
        <h1 class="TituloMov" id="h1">Sign Up</h1>
    </div>



    
    
    <img src="vista/img/candado.png" class="candado">
    <img src="vista/img/usuario.png" class="usuario">
    <img src="vista/img/candado.png" class="candado2">
    <img src="vista/img/usuario.png" class="usuario2">
    <img src="vista/img/cargo.png" class="cargo">
    <script src="vista/js/ScriptLogin.js"></script>
    <!-- <script src="vista/js/ValidarLogin.js"></script> -->
    </div>
</body>
</html>
