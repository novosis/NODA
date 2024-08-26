<?php
// la conexión
    $conn = mysqli_connect('localhost','root','','novosis_NODA');
    if(!$conn) {
        echo 'No conectado';
    }
?>