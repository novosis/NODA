<?php
include_once '../Controlador/conexion.php';




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos
    $fecha = $_POST['fecha'];
    $horaI = $_POST['horaI'];
    $horaF = $_POST['horaF'];
    $insumos = $_POST['insumos'];
    $email = $_POST['email'];
    $salaId = $_POST['sala'];
    $servicioLimpieza = $_POST['limpieza'];
    echo $servicioLimpieza;

    if($servicioLimpieza == "true"){
        $horaF = date('H:i', strtotime($horaF . ' +15 minutes'));
    }else{
        $horaF = date('H:i', strtotime($horaF . ' +5 minutes'));
    }

    echo $fecha;
    echo $horaI;
    echo $horaF;
    echo $insumos;
    echo $email;
    echo $salaId;
    echo $servicioLimpieza;


    // Preparar la consulta
    $query = "INSERT INTO reserva (fecha, hora_i, hora_f, observaciones, fk_email, fk_id_e) VALUES ('$fecha', '$horaI', '$horaF', '$insumos', '$email', '$salaId')";
    
    // Ejecutar la consulta
    $result = mysqli_query($conn, $query);

    // Verificar si la inserción fue exitosa
    if ($result) {
        echo json_encode(["status" => "success", "message" => "Agenda creada exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al crear la agenda", "error" => mysqli_error($conn)]);
    }

    // Cerrar la conexión
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Método de solicitud no permitido"]);
}
?>
