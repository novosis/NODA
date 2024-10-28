<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../Controlador/conexion.php';

    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $capacidad = $_POST['capacidad'];
    $recursos = $_POST['recursos']; // Asumiendo que esto es un array o cadena separada por comas

    // Manejo del archivo de imagen
    $imagen = $_FILES['imagen']['name'];
    $rutaImagen = '../vista/img/' . basename($imagen);

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
        // 1. Insertar sala en la tabla "espacio"
        $rutaImagen = 'vista/img/' . basename($imagen);
        $sql_sala = "INSERT INTO espacio (nom_sala, capacidad, imagen) VALUES ('$nombre', $capacidad, '$rutaImagen')";
        
        if ($conn->query($sql_sala) === TRUE) {
            $last_sala_id = $conn->insert_id; // ID de la sala recién insertada

            // 2. Insertar recursos en la tabla "recurso" (puede ser un loop si hay múltiples recursos)
            $recursosArray = explode(',', $recursos); // Supongamos que los recursos están separados por comas
            foreach ($recursosArray as $recurso) {
                $sql_recurso = "INSERT INTO recurso (nom_r, descripcion) VALUES ('$recurso', 'Descripción del recurso')";
                $conn->query($sql_recurso);
                $last_recurso_id = $conn->insert_id;

            }
            // Devolver la información de la sala insertada
            echo json_encode(['id' => $last_sala_id, 'nombre' => $nombre, 'capacidad' => $capacidad, 'recursos' => $recursos, 'imagen' => $rutaImagen]);
        } else {
            echo "Error: " . $sql_sala . "<br>" . $conn->error;
        }
    } else {
        echo "Error al mover la imagen a la carpeta.";
    }

    // Cerrar la conexión
    $conn->close();
}
?>
