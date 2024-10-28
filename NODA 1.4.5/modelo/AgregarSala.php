<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../Controlador/conexion.php';

    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $capacidad = $_POST['capacidad'];
    $recursos = $_POST['recursos'];

    // Manejo del archivo de imagen
    $imagen = $_FILES['imagen']['name'];
    $rutaImagen = 'vista/img/' . basename($imagen);

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], '../' . $rutaImagen)) {
        // Insertar sala en la tabla "espacio"
        $sql_sala = "INSERT INTO espacio (nom_sala, capacidad, recursos, imagen) 
                     VALUES (?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql_sala);
        $stmt->bind_param("siss", $nombre, $capacidad, $recursos, $rutaImagen);
        
        if ($stmt->execute()) {
            $last_sala_id = $conn->insert_id;

            // Devolver la información de la sala insertada
            echo json_encode([
                'id' => $last_sala_id, 
                'nombre' => $nombre, 
                'capacidad' => $capacidad, 
                'recursos' => $recursos, 
                'imagen' => $rutaImagen
            ]);
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error al mover la imagen a la carpeta.";
    }

    // Cerrar la conexión
    $conn->close();
}
?>