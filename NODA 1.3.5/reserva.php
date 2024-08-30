<?php session_start();

if (isset($_SESSION['usuario'])) {
    require 'public/menuReservas.view.php';
} else {
    header('Location: login_registrar.php');
}


?>