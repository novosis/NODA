<?php

require_once '../Controlador/conexion.php';

// Verifica si los datos han sido enviados vía POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtén los datos del formulario
    $id_reserva = isset($_POST['id_reserva']) ? intval($_POST['id_reserva']) : null;
    $sala = isset($_POST['sala']) ? intval($_POST['sala']) : null;
    $fecha = isset($_POST['fecha']) ? $_POST['fecha'] : null;
    $hora_inicio = isset($_POST['hora_inicio']) ? $_POST['hora_inicio'] : null;
    $hora_fin = isset($_POST['hora_fin']) ? $_POST['hora_fin'] : null;
    $observaciones = isset($_POST['observaciones']) ? $_POST['observaciones'] : null;

    // Validar que todos los campos requeridos no estén vacíos
    if ($id_reserva && $sala && $fecha && $hora_inicio && $hora_fin && !empty($observaciones)) {

        // Preparar la consulta SQL para actualizar la reserva
        $sqlUpdate = "
            UPDATE reserva 
            SET fk_id_e = ?, fecha = ?, hora_i = ?, hora_f = ?, observaciones = ?
            WHERE id_auto = ?
        ";

        // Usar prepared statements para evitar inyecciones SQL
        if ($stmt = $conn->prepare($sqlUpdate)) {
            // Vincular los parámetros a la consulta
            $stmt->bind_param("issssi", $sala, $fecha, $hora_inicio, $hora_fin, $observaciones, $id_reserva);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Si se actualizó correctamente
                echo json_encode(['status' => 'success', 'message' => 'Reserva actualizada correctamente.']);
            } else {
                // Si hubo un error en la ejecución
                echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la reserva.']);
            }

            // Cerrar el statement
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
    }

    // Cerrar la conexión a la base de datos
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de solicitud no válido.']);
}
?>
