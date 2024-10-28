<?php session_start();

if (isset($_SESSION['usuario'])) {
    require 'vista/usuarios.view.php';
} else {
    header('Location: modelo/login_registrar.php');
}


?>