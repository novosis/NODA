<?php session_start();

if (isset($_SESSION['usuario'])) {
    header('Location: menuprincipal.php');
} else {
    header('Location: login_registrar.php');
}