<?php

if (!isset($_SESSION['usuario'])) {
    header('Location: ../login_registrar.php');
}

require_once 'header.view.php';

?>

<!DOCTYPE html>
<html>
    <head>
        <title>
            Menu secundaria
        </title>
        <link rel="stylesheet" href="vista/css/style-menu/styleMenuSecOperativo.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
    </head>
 <body>
    <div class="todo">
 <div class="containeropciones">
<!-- cuarta entrega -->
    <div class="opciones">
        <div id="escuela">
            <h1>Escuela</h1>
        </div>
        <div id="liceo">
            <h1>Liceo</h1>
        </div> 
    </div>

            <div ID="fila1">
                    <div id="blancoVS">
                        <div id="verSalas" onclick="location.href='agenda.php'">
                            <img src="vista/img/verSalas.png" alt="">
                            <h1>Ver salas</h1>
                        </div>
                    </div>

                    <div id="blancoMR">
                        <div id="misReservas" onclick="location.href='misreservas.php'">
                            <img src="vista/img/misReservas.png" alt="">
                            <h1>Mis reservas</h1>
                        </div>
                    </div>
            </div>

            <div ID="fila2">
                <div id="blancoR">
                    <div id="reservas"  onclick="location.href='reserva.php'">
                        <img src="vista/img/reservas.png" alt="">
                        <h1>Reservas</h1>
                    </div>
                </div>
            
                <div id="blancoP">
                    <div id="perfiles" onclick="location.href='perfil.php'">
                        <img src="vista/img/verUsuario.png" alt="">
                        <h1>Perfiles</h1>
                    </div>
                </div>
            </div>
    </div>  
    </div>
</body>
</html>