<?php 
    session_start();
    session_destroy();
    $_SESSION = array();

    header('Location: Controlador/login_registrar.php');
die();
?>