<?php 
session_start();

if(!isset($_SESSION['usuario'])){
    header('Content-Type: application/json');
    echo json_encode([]);
    exit();
}

try {
    $conexion = new PDO('mysql:host=localhost;dbname=novosis_noda', 'root', '');
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}

$email = $_SESSION['usuario'];
$statement = $conexion->prepare('
    SELECT reserva.fecha, reserva.hora_i, reserva.hora_f, reserva.observaciones, espacio.nom_sala, espacio.imagen
    FROM reserva
    INNER JOIN espacio ON reserva.fk_id_e = espacio.id_espacio
    WHERE reserva.fk_email = :email
');
$statement->execute(array(':email' => $email));

$reservas = $statement->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($reservas);
?>
