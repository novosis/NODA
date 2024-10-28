<?php
// Inicia la sesión si es necesario (dependiendo de tu configuración)
session_start();

// Verifica que el ID de la sala se haya recibido correctamente
if (isset($_POST['id'])) {
    // Obtener el ID de la sala desde la solicitud POST
    $id_sala = $_POST['id'];

    // Incluir la conexión a la base de datos
    require_once '../Controlador/conexion.php';  // Asegúrate de que la ruta es correcta

    // Preparar la consulta para eliminar la sala de la base de datos
    $sql = "DELETE FROM espacio WHERE id_espacio = ?";
    
    // Crear la conexión y preparar la consulta
    if ($stmt = $conn->prepare($sql)) {
        // Vincular el parámetro ID de la sala
        $stmt->bind_param("i", $id_sala);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo "Sala eliminada correctamente.";  // Éxito
        } else {
            echo "Error al eliminar la sala.";  // Error en la ejecución
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        echo "Error en la preparación de la consulta.";  // Error en la preparación
    }

    // Cerrar la conexión a la base de datos
    $conn->close();
} else {
    echo "No se recibió el ID de la sala.";
}
?>
