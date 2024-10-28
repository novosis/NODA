$(document).ready(function() {
    // Función para obtener las reservas y agregarlas al contenedor
    function cargarReservas() {
        $.ajax({
            url: 'modelo/ObtenerReservas.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('.Container').empty(); // Limpiar el contenedor antes de agregar nuevas reservas
                
                if (data.length === 0) {
                    // Si no hay reservas, mostramos un mensaje
                    mostrarMensajeNoReservas();
                } else {
                    // Ordenar los datos según el filtro seleccionado
                    let opcionOrdenar = $('#ordenar').val();
                    data.sort(function(a, b) {
                        if (opcionOrdenar === 'az') {
                            return a.nombre.localeCompare(b.nombre);
                        } else if (opcionOrdenar === 'za') {
                            return b.nombre.localeCompare(a.nombre);
                        }
                        return 0;
                    });
                    
                    // Agregar las reservas al contenedor
                    data.forEach(function(sala) {
                        agregarSala(sala.id, sala.nombre, sala.capacidad, sala.fecha, sala.hora, sala.imagen);
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX: ", status, error);
                console.error("Respuesta del servidor: ", xhr.responseText);
            }
        });
    }
    
    // Cargar reservas al cargar la página
    cargarReservas();

    // Actualizar las reservas cuando cambia la opción de ordenamiento
    $('#ordenar').change(function() {
        cargarReservas();
    });
});

function agregarSala(id, nombre, capacidad, fecha, hora, imagen) {
    let salaHTML = `
    <div class="Reserva">
        <img src="${imagen}" alt="Imagen de la Sala" class="SalaImg">
        <div class="ReservaInfo">
            <p class="texto">Reservada por: <span>${nombre}</span></p>
            <p class="texto">Sala: <span>${capacidad}</span></p>
            <p class="texto">Fecha: <span>${fecha}</span></p>
            <p class="texto">Hora: <span>${hora}</span></p>
        </div>
    </div>`;

    $('.Container').append(salaHTML);
}

function mostrarMensajeNoReservas() {
    let mensajeHTML = `
    <div class="No-reservas">
        <p class="texto-no-reservas">No hay reservas en este momento.</p>
    </div>`;

    $('.Container').append(mensajeHTML);
}
