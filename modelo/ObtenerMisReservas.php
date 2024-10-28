<?php 
// Iniciar la sesión
session_start();

// Verificar si el usuario está logueado
if(!isset($_SESSION['usuario'])){
    // Si no está logueado, devolver una respuesta JSON vacía
    header('Content-Type: application/json');
    echo json_encode([]);
    exit();
}

try {
    // Intentar conectar a la base de datos
    $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}

// Obtener el email del usuario desde la sesión
$email = $_SESSION['usuario'];

// Preparar la consulta SQL para obtener las reservas del usuario
$statement = $conexion->prepare('
    SELECT reserva.fecha, reserva.hora_i, reserva.hora_f, reserva.observaciones, espacio.nom_sala, espacio.imagen
    FROM reserva
    INNER JOIN espacio ON reserva.fk_id_e = espacio.id_espacio
    WHERE reserva.fk_email = :email
');

// Ejecutar la consulta con el email del usuario
$statement->execute(array(':email' => $email));

// Obtener todas las reservas en un array asociativo
$reservas = $statement->fetchAll(PDO::FETCH_ASSOC);

// Devolver las reservas en formato JSON
header('Content-Type: application/json');
echo json_encode($reservas);
?>