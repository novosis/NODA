<?php session_start();

if (isset($_SESSION['usuario'])) {
    require 'public/menuEnDesarrollo.view.php';
} else {
    header('Location: login_registrar.php');
}

?>