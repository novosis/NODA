<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../Controlador/conexion.php';

    // Obtener datos del formulario
    $sala_id = $_POST['sala_id']; // ID de la sala a actualizar
    $nombre = $_POST['nombre'];
    $capacidad = $_POST['capacidad'];
    $recursos = $_POST['recursos']; // Asumiendo que es un array o cadena separada por comas
    $imagen = $_FILES['imagen']['name'];

    // Si se sube una nueva imagen, manejarla
    if (!empty($imagen)) {
        $rutaImagen = '../vista/img/' . basename($imagen);
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
            $rutaImagen = 'vista/img/' . basename($imagen); // Ruta para almacenar en la base de datos
        } else {
            echo "Error al mover la imagen a la carpeta.";
            exit;
        }
    }

    // 1. Actualizar sala en la tabla "espacio"
    $sql_update_sala = "UPDATE espacio SET 
                        nom_sala = '$nombre', 
                        capacidad = $capacidad";
    
    // Si se subió una nueva imagen, incluir la actualización del campo "imagen"
    if (!empty($imagen)) {
        $sql_update_sala .= ", imagen = '$rutaImagen'";
    }

    $sql_update_sala .= " WHERE id_sala = $sala_id";

    if ($conn->query($sql_update_sala) === TRUE) {
        // 2. Actualizar recursos de la sala
        $recursosArray = explode(',', $recursos); // Suponiendo que los recursos están separados por comas

        // Recorrer los recursos y actualizarlos
        foreach ($recursosArray as $recurso) {
            // Actualizar recurso
            $sql_update_recurso = "UPDATE recurso SET nom_r = '$recurso' WHERE nom_r = '$recurso'";
            $conn->query($sql_update_recurso);
        }

        // Devolver la información de la sala actualizada
        echo json_encode(['id' => $sala_id, 'nombre' => $nombre, 'capacidad' => $capacidad, 'recursos' => $recursos, 'imagen' => $rutaImagen]);
    } else {
        echo "Error: " . $sql_update_sala . "<br>" . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>
