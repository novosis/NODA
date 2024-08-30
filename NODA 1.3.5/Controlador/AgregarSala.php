<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'conexion.php';

    // Obtener datos del formulario
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $capacidad = intval($_POST['capacidad']);
    $recursos = $conn->real_escape_string($_POST['recursos']);

    // Manejo del archivo de imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagen = $_FILES['imagen']['name'];
        $rutaImagen = '../vista/img/' . basename($imagen);

        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
            // Preparar la consulta SQL para insertar la nueva sala
            $sql = "INSERT INTO salas (nombre, capacidad, recursos, imagen) VALUES ('$nombre', $capacidad, '$recursos', '$rutaImagen')";

            // Ejecutar la consulta
            if ($conn->query($sql) === TRUE) {
                // Devolver la información de la sala insertada en formato JSON
                $last_id = $conn->insert_id;
                header('Content-Type: application/json');
                echo json_encode([
                    'id' => $last_id,
                    'nombre' => $nombre,
                    'capacidad' => $capacidad,
                    'recursos' => $recursos,
                    'imagen' => $rutaImagen
                ]);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Error en la consulta SQL: ' . $conn->error]);
            }
        } else {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al mover el archivo de imagen.']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error al cargar la imagen.']);
    }

    // Cerrar la conexión
    $conn->close();
}
?>
