<?php 
    session_start();
    session_destroy();
    $_SESSION = array();

    header('Location: login_registrar.php');
die();
?>