<?php
include_once '../Controlador/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $fecha = $_POST['fecha'];
    $horaI = $_POST['horaI'];
    $horaF = $_POST['horaF'];
    $cantidad = $_POST['cantidad'];
    $email = $_POST['email'];
    $salaId = $_POST['sala'];

    if ($cantidad <= 0) {
        echo json_encode(["status" => "error", "message" => "La cantidad debe ser mayor que cero."]);
        exit;
    }
    $fechasReservas = [];
    $fechaInicial = new DateTime($fecha);

    for ($i = 0; $i < $cantidad; $i++) {
        $fechaReservada = clone $fechaInicial;

        while ($fechaReservada->format('N') != 6) {
            $fechaReservada->modify('+1 day');
        }
        $fechasReservas[] = $fechaReservada->format('Y-m-d');

        $fechaInicial->modify('+1 week');
    }

    $insertValues = [];
    foreach ($fechasReservas as $fechaReserva) {
        $insertValues[] = "('$fechaReserva', '$horaI', '$horaF', '', '$email', '$salaId')";
    }
    $valuesString = implode(", ", $insertValues);
    $query = "INSERT INTO reserva (fecha, hora_i, hora_f, observaciones, fk_email, fk_id_e) VALUES $valuesString";

    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(["status" => "success", "message" => "Agenda creada exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al crear la agenda", "error" => mysqli_error($conn)]);
    }

    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Método de solicitud no permitido"]);
}
?>