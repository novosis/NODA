<?php
$conn = new mysqli('localhost', 'root', '', 'novosis_noda');
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
