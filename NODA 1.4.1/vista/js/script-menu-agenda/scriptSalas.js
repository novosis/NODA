$(document).ready(function() {
    $.ajax({
        url: 'Controlador/ObtenerSalas.php',
        type: 'GET',
        dataType: 'json', // Esto manejará automáticamente el análisis del JSON
        success: function(data) {
            console.log('Respuesta del servidor:', data);

            if (data.length === 0) {
                // Si no hay salas, mostrar un mensaje
                $('.ContenedorSalas').append('<p>No hay salas disponibles en este momento.</p>');
            } else {
                // Si hay salas, iterar y agregarlas al DOM
                data.forEach(function(sala) {
                    agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener las salas:', error);
        }
    });  

    document.getElementById('buscar').addEventListener('keyup', function() {
        // Obtiene el valor del campo de búsqueda y lo convierte a minúsculas
        let query = this.value.toLowerCase();
        
        // Selecciona todos los elementos con la clase 'Sala'
        let reservas = document.querySelectorAll('.Sala');
    
        // Itera sobre cada elemento de reserva
        reservas.forEach(function(reserva) {
            // Obtiene el texto del elemento de reserva y lo convierte a minúsculas
            let textoReserva = reserva.innerText.toLowerCase();
            
            // Verifica si el texto de la reserva incluye el texto de búsqueda
            if (textoReserva.includes(query)) {
                reserva.style.display = 'flex';  // Muestra la reserva si coincide con la búsqueda
            } else {
                reserva.style.display = 'none';  // Oculta la reserva si no coincide
            }
        });
    });

    $('#formularioAgregarSala').hide();
    // Mostrar el formulario al hacer clic en "Agregar Sala"
    $('#btnAgregarSala').on('click', function() {
        $('#formularioAgregarSala').fadeIn(); // Mostrar el formulario con un efecto de desvanecimiento
    });

    // Cerrar el formulario al hacer clic en "Cerrar"
    $('#btnCerrarFormulario').on('click', function() {
        $('#formularioAgregarSala').fadeOut();
    });

    $('#btnGuardarSala').on('click', function() {
        // Validar el formulario
        if ($('#formAgregarSala')[0].checkValidity()) {
            // Crear un objeto FormData a partir del formulario
            const formData = new FormData($('#formAgregarSala')[0]);
    
            $.ajax({
                url: 'Controlador/AgregarSala.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log('Respuesta del servidor:', response);
                    
                    try {
                    const sala = JSON.parse(response);

                    // Verificar la estructura de la respuesta JSON
                    if (sala.id && sala.nombre && sala.capacidad && sala.recursos && sala.imagen) {
                        agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
                        $('#formularioAgregarSala').fadeOut();
                        $('#formAgregarSala')[0].reset();
                    } else {
                        console.error('Respuesta JSON incompleta:', sala);
                    }
                } catch (e) {
                    console.error('Error al analizar JSON:', e);
                    // Mostrar la respuesta cruda en caso de error
                    console.error('Respuesta cruda del servidor:', response);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
                console.error('Respuesta del servidor:', jqXHR.responseText);
            }
        });
    } else {
        // Mostrar mensaje de error si el formulario no es válido
        $('#formAgregarSala')[0].reportValidity();
    }
});
    
    // Función para agregar una sala al DOM
    function agregarSala(id, nombre, capacidad, recursos, imagen) {
        let salaHTML = `
        <div class="Sala">
            <div class="SalaInfo">
                <img src="${imagen}" alt="ImagenSala" class="SalaImagen">
                <div>
                    <p>Nombre de sala: <span>${nombre}</span></p>
                    <p>Capacidad de personas: <span>${capacidad}</span></p>
                    <p>Recursos de sala: <span>${recursos}</span></p>
                </div>
            </div>
            <button class="Agendar" id="${id}">Agendar</button>
        </div>`;
        
        $('.ContenedorSalas').append(salaHTML);

       $(`#${id}`).on('click', function() {
            let salaId = $(this).data('id'); // Obtiene el ID de la sala desde el atributo 'data-id' del elemento.
            $('.ContenedorSalas').append(`
        
        <div class="todo">
         <div class="cerrar"><h1>x</h1></div>
            <div class="container">
                <!-- FORMULARIO -->
                <div class="formularioDiv">
                    <!--imagen de salones-->
                    <div class="img">
                        <img src="#" alt="" class="salon">
                    </div>
                    <div>
                        <!--CREACION DE FORMULARIO-->
                        <form action="index.html">
                            <!--input de fecha-->
                            <label for="fechaYHora" id="labelFechaYHora" class="label">Fecha y hora</label> <br>
                            <input type="date" name="fecha" class="inputForm" id="fecha">
                            <!--input de hora-->
                            <input type="time" name="horI" class="inputForm" id="horaI">
                            <input type="time" name="horaF" class="inputForm" id="horaF">
                            <!--input de insumos-->
                            <label for="insumos" class="label">Insumos</label>
                            <textarea name="insumos" class="inputForm" id="insumos"></textarea>
                            <!--input de limpieza-->
                            <label for="serLimpieza" class="label" id="servLimpieza">Servicio de limpieza</label>
                            <label class="switch">
                                <input type="checkbox" id="toggleSwitch">
                                <span class="slider"></span>
                            </label>
                            <!--input de agenda-->
                            <button class="agendar" name="Agendar">Agendar</button>
                        </form>
                    </div>
                </div>
                <!-- CALENDARIO -->
                <div class="calendarioDiv">
                    <!-- vistas de el calendario-->
                    <div class="vistas">
                        <button class="vista" id="diario"><h1>Día</h1></button>
                        <button class="vista" id="semanal"><h1>Semana</h1></button>
                        <button class="vista" id="mensual"><h1>Mes</h1></button>
                    </div>
                    
                    <div class="row align-items-start" id="dias">
                        <div class="col">
                            <!-- Flecha de retroceder-->
                            <div class="retroceder">
                                <img src="vista/img/flecha-calendario-izquierda.png" alt="" class="flechaRetroceder">
                            </div>
                        </div>
                        <div class="col">
                            <div class="info">
                                <!--dia-->
                                <h1 class="numDia-mes">24</h1>  
                                <!--mes-->
                                <h3 class="mes-anio">enero</h3>
                            </div>
                        </div>
                        <div class="col">
                            <!-- Flecha de avanzar -->
                            <div class="avanzar">
                                <img src="vista/img/flecha-calendario-derecha.png" alt="" class="flechaAvanzar">
                            </div>
                        </div>
                    </div>
        
                    <!--creacion de calendario-->
                    <div class="calendario">
                        <!-- Días de la semana -->
                            <div class="diasSemana">
                                <div class="diaSemana" id="do"><h1>D</h1></div>
                                <div class="diaSemana" id="lu"><h1>L</h1></div>
                                <div class="diaSemana" id="ma"><h1>M</h1></div>
                                <div class="diaSemana" id="mi"><h1>M</h1></div>
                                <div class="diaSemana" id="ju"><h1>J</h1></div>
                                <div class="diaSemana" id="vi"><h1>V</h1></div>
                                <div class="diaSemana" id="sa"><h1>S</h1></div>
                            </div>
                            
                        <!--creacion en js por diferentes vistas-->
                    </div>
                </div>
            </div>
        </div>
        `
            );
        
            calendario();
        });
        }
        
        });




      