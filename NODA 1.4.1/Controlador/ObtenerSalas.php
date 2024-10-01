<?php
ob_start(); // Iniciar el buffer de salida

include_once 'conexion.php';

// Consulta para obtener nombre, capacidad, recursos y la imagen de las salas.
$sql = "
SELECT 
    e.id_espacio AS id,
    e.nom_sala AS nombre,
    e.capacidad,
    GROUP_CONCAT(r.nom_r SEPARATOR ', ') AS recursos,
    e.imagen
FROM 
    espacio e
LEFT JOIN 
    contiene c ON e.id_espacio = c.fk_id_e
LEFT JOIN 
    recurso r ON c.fk_id_r = r.id_r
GROUP BY 
    e.id_espacio;
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
