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
    $recursos = $_POST['recursosEditar'] ?? '';

    // Verificar que todos los campos estén definidos
    if (empty($nombre) || empty($capacidad)) {
        echo json_encode(['error' => 'Datos incompletos']);
        exit;
    }

   // Procesar la imagen si está presente
   $imagen = null;
   if (isset($_FILES['imagenEditar']) && $_FILES['imagenEditar']['error'] === UPLOAD_ERR_OK) {
       $imagen = 'vista/img/' . basename($_FILES['imagenEditar']['name']);
       if (!move_uploaded_file($_FILES['imagenEditar']['tmp_name'], '../' . $imagen)) {
           echo json_encode(['error' => 'Error al mover la imagen']);
           exit;
       }
   }

   // Iniciar una transacción para asegurarnos de que todo se ejecute correctamente
   $conn->begin_transaction();

   try {
       // Actualizar sala
       if ($imagen) {
           $stmt = $conn->prepare("UPDATE espacio SET nom_sala = ?, capacidad = ?, recursos = ?, imagen = ? WHERE id_espacio = ?");
           $stmt->bind_param("sissi", $nombre, $capacidad, $recursos, $imagen, $id_sala);
       } else {
           $stmt = $conn->prepare("UPDATE espacio SET nom_sala = ?, capacidad = ?, recursos = ? WHERE id_espacio = ?");
           $stmt->bind_param("sisi", $nombre, $capacidad, $recursos, $id_sala);
       }

       // Ejecutar la consulta
       if (!$stmt->execute()) {
           throw new Exception("Error al actualizar la sala: " . $stmt->error);
       }

       // Confirmar la transacción
       $conn->commit();

       // Respuesta exitosa
       $response = [
           'id' => $id_sala,
           'nombreEditar' => $nombre,
           'capacidadEditar' => $capacidad,
           'recursosEditar' => $recursos,
           'imagenEditar' => $imagen
       ];
       echo json_encode($response);
   } catch (Exception $e) {
       // Revertir la transacción en caso de error
       $conn->rollback();
       echo json_encode(['error' => $e->getMessage()]);
   }

   // Cerrar las declaraciones preparadas
   if (isset($stmt)) {
       $stmt->close();
   }
}

$conn->close();