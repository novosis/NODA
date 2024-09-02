<?php session_start();

if (isset($_SESSION['usuario'])) {
    header('Location: menuprincipal.php');
} else {
    header('Location: Controlador/login_registrar.php');
}