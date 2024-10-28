<?php
include_once '../Controlador/conexion.php';

// Consulta para obtener las reservas y la información relacionada
$sql = "
SELECT 
    r.id_auto, r.fecha, r.hora_i, r.hora_f, r.observaciones, 
    u.nombre AS usuario_nombre, u.apellido AS usuario_apellido, 
    e.nom_sala AS sala, e.capacidad, e.imagen
FROM 
    reserva r
JOIN 
    usuario u ON r.fk_email = u.email
JOIN 
    espacio e ON r.fk_id_e = e.id_espacio
";

$result = $conn->query($sql);

$reservas = [];

if ($result->num_rows > 0) {
    // Recorrer cada fila y agregarla al array de reservas
    while($row = $result->fetch_assoc()) {
        $reservas[] = [
            'id' => $row["id_auto"],
            'nombre' => $row["usuario_nombre"] . " " . $row["usuario_apellido"],
            'capacidad' => $row["sala"] . " (Capacidad: " . $row["capacidad"] . ")",
            'fecha' => $row["fecha"],
            'hora' => $row["hora_i"] . " - " . $row["hora_f"],
            'recursos' => $row["observaciones"],
            'imagen' => $row["imagen"]
        ];
    }
}

// Configurar el tipo de contenido a JSON
header('Content-Type: application/json');
echo json_encode($reservas);

$conn->close();
?>
