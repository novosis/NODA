<?php session_start();

if (isset($_SESSION['usuario'])) {
    require 'public/menuAgenda.view.php';
} else {
    header('Location: login_registrar.php');
}


?>