$(document).ready(function() {
    $.ajax({
        url: '../Controlador/ObtenerReservas.php',
        type: 'GET',
        dataType: 'json', // Aquí especificamos que esperamos una respuesta JSON
        success: function(data) {
            // La respuesta ya está parseada como JSON
            data.forEach(function(sala) {
                agregarSala(sala.id, sala.nombre, sala.capacidad, sala.fecha, sala.hora, sala.imagen);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX: ", status, error);
            console.error("Respuesta del servidor: ", xhr.responseText);
        }
    });
});

function agregarSala(id, nombre, capacidad, fecha, hora, imagen) {
    let salaHTML = `
    <div class="Reserva">
     <img src="${imagen}" alt="Imagen de la Sala" class="SalaImg">
        <div class="ReservaInfo">
            <p>Reservada por: <span>${nombre}</span></p>
            <p>Sala: <span>${capacidad}</span></p>
            <p>Fecha: <span>${fecha}</span></p>
            <p>Hora: <span>${hora}</span></p>
        </div>
       
    </div>`;

    $('.Container').append(salaHTML);
}
