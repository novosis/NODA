<?php 
// Iniciar la sesión
session_start();

// Verificar si el usuario ya está logueado
if(isset($_SESSION['usuario'])){
    // Redirigir al usuario a la página principal si ya está logueado
    header('Location: ../index.php');
    exit();
}

// Verificar si la solicitud es de tipo POST
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener la acción del formulario (login o signup)
    $action = $_POST['action'];

    // Llamar a la función correspondiente según la acción
    if ($action == 'login') {
        login();
    } else if ($action == 'signup') {
        registro();
    }
}

// Función para manejar el inicio de sesión
function login(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        // Sanitizar y obtener los datos del formulario
        $email = filter_var(strtolower($_POST['email']), FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];
        // Encriptar la contraseña
        $password = hash('sha512', $password);

        // Intentar conectar a la base de datos
        try {
            $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
        } catch (PDOException $e) {
            // Manejar error de conexión
            $_SESSION['error'] = 'Error de conexión con la base de datos';
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit();
        }
        
        // Preparar y ejecutar la consulta SQL para verificar las credenciales
        $statement = $conexion->prepare('SELECT * FROM usuario WHERE email = :email AND password = :password');
        $statement->execute(array(
            ':email' => $email, 
            ':password' => $password
        ));

        // Obtener el resultado de la consulta
        $resultado = $statement->fetch();
        if ($resultado != false) {
            // Si las credenciales son correctas, iniciar sesión y redirigir al usuario
            $_SESSION['usuario'] = $email;
            $_SESSION['cargo'] = $resultado['cargo'];
            $_SESSION['nombre'] = $resultado['nombre'];
            $_SESSION['apellido'] = $resultado['apellido'];
            $_SESSION['mensaje'] = 'Sesión iniciada correctamente';
            header('Location: ../index.php');
            exit();
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            ?>
            <div class="alert show">
                <span class="fas fa-exclamation-circle"></span>
                <span class="msg"><?php echo "El usuario o contraseña son incorrectos"; ?></span>
                <span class="close-btn">
                    <span class="fas fa-times"></span>
                </span>
            </div>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script>
                // Mostrar y ocultar la alerta de error
                $('.alert').removeClass("hide");
                $('.alert').addClass("show");
                $('.alert').addClass("showAlert");
                setTimeout(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                }, 5000);

                $('.close-btn').click(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                });
            </script>
            <?php
        }
    }
}

// Función para manejar el registro de nuevos usuarios
function registro(){
    // Verificar si la solicitud es de tipo POST
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        // Sanitizar y obtener los datos del formulario
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_SPECIAL_CHARS);
        $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_var(strtolower($_POST['email']), FILTER_SANITIZE_EMAIL);
        $cargo = $_POST['cargo'];
        $password = $_POST['password'];

        try {
            $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
        } catch (PDOException $e) {
            // Manejar error de conexión
            $_SESSION['error'] = 'Error de conexión con la base de datos';
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit();
        }

        // Preparar y ejecutar la consulta SQL para verificar si el email ya existe
        $statement = $conexion->prepare('SELECT * FROM usuario WHERE email = :email LIMIT 1');
        $statement->execute(array(':email' => $email));
        $resultado = $statement->fetch();

        if ($resultado != false) {
            // Mostrar mensaje de error si el email ya está registrado
            ?>
            <div class="alert show">
                <span class="fas fa-exclamation-circle"></span>
                <span class="msg"><?php echo "Ya existe un usuario con ese E-mail"; ?></span>
                <span class="close-btn">
                    <span class="fas fa-times"></span>
                </span>
            </div>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script>
                // Mostrar y ocultar la alerta de error
                $('.alert').removeClass("hide");
                $('.alert').addClass("show");
                $('.alert').addClass("showAlert");
                setTimeout(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                }, 5000);

                $('.close-btn').click(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                });
            </script>
            <?php
            return;
        }

        // Encriptar la contraseña
        $password = hash('sha512', $password);

        // Preparar y ejecutar la consulta SQL para insertar el nuevo usuario
        $statement = $conexion->prepare('INSERT INTO usuario (nombre, apellido, email, cargo, password) VALUES (:nombre, :apellido, :email, :cargo, :password)');
        $statement->execute(array(
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':email' => $email,
            ':cargo' => $cargo, 
            ':password' => $password
        ));
        ?>
            <div class="alert show">
                <span class="fa-solid fa-check"></span>
                <span class="msg"><?php echo "Usuario registrado correctamente"; ?></span>
                <span class="close-btn">
                    <span class="fas fa-times"></span>
                </span>
            </div>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script>
                // Mostrar y ocultar la alerta de éxito
                $('.alert').removeClass("hide");
                $('.alert').addClass("show");
                $('.alert').addClass("showAlert");
                setTimeout(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                }, 5000);

                $('.close-btn').click(function(){
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                });
            </script>
            <?php
    }
}

// Incluir la vista del formulario de login
require '../public/login.view.php';
?>