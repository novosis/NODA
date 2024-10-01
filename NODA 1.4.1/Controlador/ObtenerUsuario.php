<?php
require_once 'conexion.php';
// Especifica que el contenido devuelto es JSON
header('Content-Type: application/json'); 

// Verifica si se recibió una solicitud POST con el parámetro 'res'
if (isset($_POST['res'])) {
    $json = array(); 

    // Verifica si se ha enviado un término de búsqueda y no está vacío
    if (isset($_POST['busqueda']) && !empty($_POST['busqueda'])) {
        $busqueda = $conn->real_escape_string($_POST['busqueda']); 
        
        // Consulta SQL para filtrar registros basados en el término de búsqueda
        $query = "SELECT * FROM usuario WHERE nombre LIKE '%$busqueda%' OR apellido LIKE '%$busqueda%' OR email LIKE '%$busqueda%' OR cargo LIKE '%$busqueda%'";
    } else {
        $query = "SELECT * FROM usuario";
    }

    // Ejecuta la consulta SQL
    $result = mysqli_query($conn, $query);

    // Verifica si la consulta fue exitosa y si se encontraron registros
    if ($result && mysqli_num_rows($result) > 0) {
        // Recorre los registros y los añade al array $json
        while ($row = mysqli_fetch_assoc($result)) {
            $nombre = $row['nombre'];
            $apellido = $row['apellido'];
            $iniciales = strtoupper(substr($nombre, 0, 1) . substr($apellido, 0, 1)); 

            $json[] = array(
                'email' => $row['email'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'cargo' => $row['cargo'],
                'iniciales' => $iniciales 
            );
        }
        // Devuelve el array $json como una cadena JSON
        echo json_encode($json);
    } else {
        // Si no se encuentran registros, devuelve un array vacío como JSON
        echo json_encode([]);
    }
}
?>
