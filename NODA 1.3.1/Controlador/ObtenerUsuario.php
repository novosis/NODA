<?php
require_once 'conexion.php'; // Incluye el archivo de conexión a la base de datos
header('Content-Type: application/json'); // Especifica que el contenido devuelto es JSON

// Verifica si se recibió una solicitud POST con el parámetro 'res'
if (isset($_POST['res'])) {
    $json = array(); // Array para almacenar los datos de los registros

    // Verifica si se ha enviado un término de búsqueda y no está vacío
    if (isset($_POST['busqueda']) && !empty($_POST['busqueda'])) {
        $busqueda = $conn->real_escape_string($_POST['busqueda']); // Escapa el término de búsqueda para prevenir inyecciones SQL
        
        // Consulta SQL para filtrar registros basados en el término de búsqueda
        // Busca en los campos 'nombre', 'apellido', 'correo' y 'cargo'
        $query = "SELECT * FROM usuario WHERE nombre LIKE '%$busqueda%' OR apellido LIKE '%$busqueda%' OR email LIKE '%$busqueda%' OR cargo LIKE '%$busqueda%'";
    } else {
        // Si no se proporciona un término de búsqueda, muestra todos los registros
        $query = "SELECT * FROM usuario";
    }

    // Ejecuta la consulta SQL
    $result = mysqli_query($conn, $query);

    // Verifica si la consulta fue exitosa y si se encontraron registros
    if ($result && mysqli_num_rows($result) > 0) {
        // Recorre los registros y los añade al array $json
        while ($row = mysqli_fetch_assoc($result)) {
            $json[] = array(
                'email' => $row['email'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'cargo' => $row['cargo']
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
