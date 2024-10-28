document.addEventListener("DOMContentLoaded", function() {
    fetchReservas();
});

function fetchReservas() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'modelo/ObtenerMisReservas.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var reservasContainer = document.getElementById('reservas-container');

            if (data.length > 0) {
                data.forEach(function(reserva) {
                    var reservaDiv = document.createElement('div');
                    reservaDiv.classList.add('reserva');
            
                    reservaDiv.innerHTML = `
                        <img src="${reserva.imagen}" alt="${reserva.nom_sala}" class="SalaImg">
                        <div class="reservainfo">
                            <p class="texto">Sala reservada: ${reserva.nom_sala}</p>
                            <p class="texto">Fecha: ${reserva.fecha}</p>
                            <p class="texto">Hora de inicio: ${reserva.hora_i}</p>
                            <p class="texto">Hora de finalización: ${reserva.hora_f}</p>
                            ${reserva.observaciones ? `<p class="texto">Observaciones: ${reserva.observaciones}</p>` : ''}
                        </div>
                        <div class="Tapar"></div>
                        <div class="btnEliminar Eliminar" data-id="${reserva.id}">
                            <img src="vista/img/eliminar.png" alt="eliminar" id="Eliminar">
                        </div>
                        <div class="btnEditar Editar" data-id="${reserva.id}">
                            <img src="vista/img/lapiz.png" alt="editar" id="Editar">
                        </div>
                    `;
            
                    reservasContainer.appendChild(reservaDiv);
                });
            } else {
                reservasContainer.innerHTML = `
                <div class="sin-reservas">
                    <p class="texto-sin-reservas">No tienes reservas.</p>
                </div>`;
            }
        } else {
            console.error('Error al cargar las reservas:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error de red al intentar cargar las reservas.');
    };

    xhr.send();
}
