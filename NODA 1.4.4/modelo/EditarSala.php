<?php

include_once '../Controlador/conexion.php';

if (!$conn) {
    die("Error de conexión con la base de datos.");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log(print_r($_POST, true));
    error_log(print_r($_FILES, true));

    // Recuperar el ID de la sala
    $id_sala = isset($_POST['salaId']) ? $_POST['salaId'] : null;

    // Verificar que el ID de la sala esté definido
    if (!$id_sala) {
        echo json_encode(['error' => 'ID de sala no proporcionado']);
        exit;
    }

    $nombre = $_POST['nombreEditar'] ?? '';
    $capacidad = $_POST['capacidadEditar'] ?? '';
    $recursos = isset($_POST['recursosEditar']) && is_array($_POST['recursosEditar']) ? $_POST['recursosEditar'] : [];

    // Verificar que todos los campos estén definidos
    if (empty($nombre) || empty($capacidad)) {
        echo json_encode(['error' => 'Datos incompletos']);
        exit;
    }

    // Procesar la imagen si está presente
    $imagen = null;
    if (isset($_FILES['imagenEditar']) && $_FILES['imagenEditar']['error'] === UPLOAD_ERR_OK) {
        $imagen = '../vista/img/' . basename($_FILES['imagenEditar']['name']);
        if (!move_uploaded_file($_FILES['imagenEditar']['tmp_name'], $imagen)) {
            echo json_encode(['error' => 'Error al mover la imagenEditar']);
            exit;
        }
    }

    // Iniciar una transacción para asegurarnos de que todo se ejecute correctamente
    $conn->begin_transaction();

    try {
        // Preparar la declaración
        if ($imagen) {
            // Actualizar sala incluyendo la imagen
            $stmt = $conn->prepare("UPDATE espacio SET nom_sala = ?, capacidad = ?, imagen = ? WHERE id_espacio = ?");
            $stmt->bind_param("sssi", $nombre, $capacidad, $imagenPath, $id_sala);
            $imagenPath = 'vista/img/' . basename($_FILES['imagenEditar']['name']); // Cambiar la ruta para la respuesta
        } else {
            // Actualizar sala sin modificar la imagen
            $stmt = $conn->prepare("UPDATE espacio SET nom_sala = ?, capacidad = ? WHERE id_espacio = ?");
            $stmt->bind_param("ssi", $nombre, $capacidad, $id_sala);
        }

        // Ejecutar la consulta
        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar la sala: " . $stmt->error);
        }

        // Limpiar las relaciones actuales de la tabla contiene para esta sala
        $deleteStmt = $conn->prepare("DELETE FROM contiene WHERE fk_id_e = ?");
        $deleteStmt->bind_param("i", $id_sala);
        if (!$deleteStmt->execute()) {
            throw new Exception("Error al eliminar las relaciones anteriores: " . $deleteStmt->error);
        }

        // Insertar los nuevos recursos seleccionados
        if (!empty($recursos)) {
            $insertStmt = $conn->prepare("INSERT INTO contiene (fk_id_r, fk_id_e) VALUES (?, ?)");
            foreach ($recursos as $id_recurso) {
                $insertStmt->bind_param("ii", $id_recurso, $id_sala);
                if (!$insertStmt->execute()) {
                    throw new Exception("Error al insertar recursos: " . $insertStmt->error);
                }
            }
            $insertStmt->close();
        }

        // Confirmar la transacción
        $conn->commit();

        // Respuesta exitosa
        $response = [
            'id' => $id_sala,
            'nombreEditar' => $nombre,
            'capacidadEditar' => $capacidad,
            'imagenEditar' => isset($imagenPath) ? $imagenPath : null, // Usar la ruta de la imagen para la respuesta
            'recursosEditar' => $recursos
        ];
        echo json_encode($response);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $conn->rollback();
        echo json_encode(['error' => $e->getMessage()]);
    }

    // Cerrar las declaraciones preparadas
    $stmt->close();
    $deleteStmt->close();
}

$conn->close();

?>
