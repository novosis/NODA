<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../Controlador/conexion.php';

    // Obtener los datos del formulario
    $id_sala = $_POST['salaId'];
    $nombre = $_POST['nombreEditar'];
    $capacidad = $_POST['capacidadEditar'];
    $recursos = $_POST['recursoEditar']; // Asumiendo que esto es un array o cadena separada por comas

    // Manejo del archivo de imagen (verificar si se ha subido una nueva imagen)
    $imagen = isset($_FILES['imagenEditar']['name']) ? $_FILES['imagenEditar']['name'] : null;
    $rutaImagen = null;

    // Si se ha subido una nueva imagen, procesarla
    if ($imagen) {
        $rutaImagen = '../vista/img/' . basename($imagen);
        if (!move_uploaded_file($_FILES['imagenEditar']['tmp_name'], $rutaImagen)) {
            echo json_encode(['error' => 'Error al mover la imagen a la carpeta.']);
            exit;
        }
        $rutaImagen = 'vista/img/' . basename($imagen);
    }

    // Iniciar una transacción para asegurar que las actualizaciones se ejecuten correctamente
    $conn->begin_transaction();

    try {
        // 1. Actualizar los datos de la sala en la tabla "espacio"
        if ($rutaImagen) {
            // Si se ha subido una nueva imagen
            $sql_sala = "UPDATE espacio SET nom_sala = ?, capacidad = ?, imagen = ? WHERE id_espacio = ?";
            $stmt = $conn->prepare($sql_sala);
            $stmt->bind_param("sssi", $nombre, $capacidad, $rutaImagen, $id_sala);
        } else {
            // Sin actualizar la imagen
            $sql_sala = "UPDATE espacio SET nom_sala = ?, capacidad = ? WHERE id_espacio = ?";
            $stmt = $conn->prepare($sql_sala);
            $stmt->bind_param("ssi", $nombre, $capacidad, $id_sala);
        }

        // Ejecutar la consulta de actualización de sala
        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar la sala: " . $stmt->error);
        }

        // 2. Limpiar los recursos antiguos asociados a la sala
        $delete_recursos = "DELETE FROM contiene WHERE fk_id_e = ?";
        $stmt_delete = $conn->prepare($delete_recursos);
        $stmt_delete->bind_param("i", $id_sala);
        if (!$stmt_delete->execute()) {
            throw new Exception("Error al eliminar recursos antiguos: " . $stmt_delete->error);
        }

        // 3. Insertar los nuevos recursos en la tabla "recurso"
        $recursosArray = explode(',', $recursos); // Supongamos que los recursos están separados por comas
        foreach ($recursosArray as $recurso) {
            // Verificar si el recurso ya existe en la tabla `recurso`
            $sql_verificar_recurso = "SELECT id_r FROM recurso WHERE nom_r = ?";
            $stmt_verificar = $conn->prepare($sql_verificar_recurso);
            $stmt_verificar->bind_param("s", $recurso);
            $stmt_verificar->execute();
            $result_verificar = $stmt_verificar->get_result();

            if ($result_verificar->num_rows > 0) {
                // El recurso ya existe, obtener su ID
                $row = $result_verificar->fetch_assoc();
                $last_recurso_id = $row['id_r'];
            } else {
                // Insertar nuevo recurso si no existe
                $sql_recurso = "INSERT INTO recurso (nom_r) VALUES (?)";
                $stmt_recurso = $conn->prepare($sql_recurso);
                $stmt_recurso->bind_param("s", $recurso);
                $stmt_recurso->execute();
                $last_recurso_id = $conn->insert_id;
            }

            // Insertar en la tabla "contiene" para asociar el recurso con la sala
            $sql_contiene = "INSERT INTO contiene (fk_id_r, fk_id_e) VALUES (?, ?)";
            $stmt_contiene = $conn->prepare($sql_contiene);
            $stmt_contiene->bind_param("ii", $last_recurso_id, $id_sala);
            if (!$stmt_contiene->execute()) {
                throw new Exception("Error al insertar el recurso: " . $stmt_contiene->error);
            }
        }

        // Confirmar la transacción
        $conn->commit();

        // Devolver la información de la sala editada
        $response = [
            'id' => $id_sala,
            'nombre' => $nombre,
            'capacidad' => $capacidad,
            'recursos' => $recursos,
            'imagen' => $rutaImagen
        ];
        echo json_encode($response);

    } catch (Exception $e) {
        // Revertir la transacción si hay un error
        $conn->rollback();
        echo json_encode(['error' => $e->getMessage()]);
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
}
?>
