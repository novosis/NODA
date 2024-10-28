<?php
ob_start(); // Iniciar el buffer de salida

include_once '../Controlador/conexion.php';

// Consulta para obtener nombre, capacidad, recursos y la imagen de las salas.
$sql = "
SELECT 
    e.id_espacio AS id,
    e.nom_sala AS nombre,
    e.capacidad,
    e.recursos,
    e.imagen
FROM 
    espacio e
";

$result = $conn->query($sql);

$salas = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $salas[] = $row;
    }
}

ob_end_clean(); // Limpiar el buffer de salida antes de enviar JSON

// Configurar el tipo de contenido a JSON
header('Content-Type: application/json');
echo json_encode($salas);

$conn->close();
?>
