<?php
$conn = new mysqli('localhost', 'root', '', 'noda');
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
