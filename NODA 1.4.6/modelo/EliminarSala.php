<?php
// Inicia la sesión si es necesario (dependiendo de tu configuración)
session_start();

// Verifica que el ID de la sala se haya recibido correctamente
if (isset($_POST['id'])) {
    // Obtener el ID de la sala desde la solicitud POST
    $id_sala = $_POST['id'];

    // Incluir la conexión a la base de datos
    require_once '../Controlador/conexion.php';  // Asegúrate de que la ruta es correcta

    // Iniciar una transacción
    $conn->begin_transaction();

    try {
        // Primero, eliminar los recursos asociados a la sala
        $sql_recursos = "DELETE FROM recursos WHERE id_espacio = ?";
        $stmt_recursos = $conn->prepare($sql_recursos);
        $stmt_recursos->bind_param("i", $id_sala);
        $stmt_recursos->execute();
        $stmt_recursos->close();

        // Luego, eliminar la sala
        $sql_sala = "DELETE FROM espacio WHERE id_espacio = ?";
        $stmt_sala = $conn->prepare($sql_sala);
        $stmt_sala->bind_param("i", $id_sala);
        $stmt_sala->execute();
        $stmt_sala->close();

        // Si todo salió bien, confirmar la transacción
        $conn->commit();
        echo "Sala y recursos asociados eliminados correctamente.";
    } catch (Exception $e) {
        // Si algo salió mal, revertir la transacción
        $conn->rollback();
        echo "Error al eliminar la sala: " . $e->getMessage();
    }

    // Cerrar la conexión a la base de datos
    $conn->close();
} else {
    echo "No se recibió el ID de la sala.";
}
?>