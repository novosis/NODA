<?php 
session_start();

if(isset($_SESSION['usuario'])){
    header('Location: index.php');
    exit();
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST['action'];

    if ($action == 'login') {
        login();
    } else if ($action == 'signup') {
        registro();
    }
}

function login(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $email = filter_var(strtolower($_POST['email']), FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];
        $password = hash('sha512', $password);

        try {
            $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            exit();
        }

        $statement = $conexion->prepare('SELECT * FROM usuario WHERE email = :email AND password = :password');
        $statement->execute(array(
            ':email' => $email, 
            ':password' => $password
        ));

        $resultado = $statement->fetch();
        if ($resultado != false) {
            $_SESSION['usuario'] = $email;
            $_SESSION['cargo'] = $resultado['cargo'];
            $_SESSION['nombre'] = $resultado['nombre'];
            $_SESSION['apellido'] = $resultado['apellido'];
            $_SESSION['mensaje'] = 'Sesión iniciada correctamente';
            header('Location: index.php');
            exit();
        } else {
            ?>
            <div class="alert show error">
                <span class="fas fa-exclamation-circle"></span>
                <span class="msg"><?php echo "El usuario o contraseña son incorrectos"; ?></span>
                <span class="close-btn">
                    <span class="fas fa-times"></span>
                </span>
            </div>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script>
                
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

function registro(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_SPECIAL_CHARS);
        $apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_var(strtolower($_POST['email']), FILTER_SANITIZE_EMAIL);
        $cargo = $_POST['cargo'];
        $password = $_POST['password'];

        try {
            $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            exit();
        }

        $statement = $conexion->prepare('SELECT * FROM usuario WHERE email = :email LIMIT 1');
        $statement->execute(array(':email' => $email));
        $resultado = $statement->fetch();

        if ($resultado != false) {
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

        $password = hash('sha512', $password);

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

require 'public/login.view.php';
?>