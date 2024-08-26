<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once 'conexion.php';

    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $capacidad = $_POST['capacidad'];
    $recursos = $_POST['recursos'];

    // Manejo del archivo de imagen
    $imagen = $_FILES['imagen']['name'];
    $rutaImagen = '../vista/img' . basename($imagen);
    move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen);

    // Preparar la consulta SQL para insertar la nueva sala
    $sql = "INSERT INTO salas (nombre, capacidad, recursos, imagen) VALUES ('$nombre', $capacidad, '$recursos', '$rutaImagen')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        // Devolver la información de la sala insertada
        $last_id = $conn->insert_id;
        echo json_encode(['id' => $last_id, 'nombre' => $nombre, 'capacidad' => $capacidad, 'recursos' => $recursos, 'imagen' => $rutaImagen]);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>
