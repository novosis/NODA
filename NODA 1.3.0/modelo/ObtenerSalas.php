<?php
include_once 'conexion.php';

// Define la consulta SQL para obtener id, nombre, capacidad, recursos y la imagen de las salas.
$sql = "SELECT id, nombre, capacidad, recursos, imagen FROM salas";
$result = $conn->query($sql);

$salas = array();

if ($result->num_rows > 0) {
     // Si hay resultados, recorre cada fila y la agrega al array $salas
    while($row = $result->fetch_assoc()) {
        $salas[] = $row;
    }
}

echo json_encode($salas); // Convierte el array $salas a formato JSON y lo imprime
$conn->close();
?>
