$(document).ready(function () {
    let userCargo = ''; // Variable para almacenar la carga del usuario
    let usuario = ''; // Variable para almacenar el email del usuario

    // Obtener la carga y el email del usuario a través de la sesión
    $.ajax({
        url: 'Controlador/session.php',
        type: 'GET',
        success: function (response) {
            console.log(response); // Verificar qué se recibe

            // Asegúrate de que la respuesta sea un objeto y no un string
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }

            userCargo = response.cargo; // Almacenar la carga del usuario
            usuario = response.usuario; // Almacenar el correo electrónico del usuario
            console.log(userCargo);
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });

    // Obtener las salas disponibles
    $.ajax({
        url: 'modelo/ObtenerSalas.php',
        type: 'GET',
        dataType: 'json', // Esto manejará automáticamente el análisis del JSON
        success: function (data) {
            console.log('Respuesta del servidor:', data);

            if (data.length === 0) {
                // Si no hay salas, mostrar un mensaje
                $('.ContenedorSalas').append('<p>No hay salas disponibles en este momento.</p>');
            } else {
                // Si hay salas, iterar y agregarlas al DOM
                data.forEach(function (sala) {
                    agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener las salas:', error);
        }
    });

    // Lógica del buscador
    document.getElementById('buscar').addEventListener('keyup', function () {
        let query = this.value.toLowerCase();
        let reservas = document.querySelectorAll('.Sala');
        reservas.forEach(function (reserva) {
            let textoReserva = reserva.innerText.toLowerCase();
            reserva.style.display = textoReserva.includes(query) ? 'flex' : 'none';
        });
    });

    // Manejar formulario de agregar sala
    $('#formularioAgregarSala').hide();
    $('#btnAgregarSala').on('click', function () {
        $('#formularioAgregarSala').fadeIn();
    });

    $('#btnCerrarFormulario').on('click', function () {
        $('#formularioAgregarSala').fadeOut();
    });

    $('#btnGuardarSala').on('click', function () {
        let formData = new FormData($('#formAgregarSala')[0]);

        $.ajax({
            url: 'modelo/AgregarSala.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
                let sala = JSON.parse(response);
                agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
                $('#formularioAgregarSala').fadeOut();
                $('#formAgregarSala')[0].reset();
            }
        });
    });

    //todo para eliminar la sala---------------------------------------
    $('#EliminarSala').hide();

    // Asocia el evento de clic al botón "Eliminar" de cada sala
    $(document).on('click', '.btnEliminar', function () {
        let id = $(this).data('id');  // Obtén el ID de la sala desde el botón presionado
        $('#btnEliminarSala').data('id', id);
        $('#EliminarSala').fadeIn();
    });

    $('#btnCerrarEliminar').on('click', function () {
        $('#EliminarSala').fadeOut();
    });

    // Asocia el evento de clic al botón "Eliminar"
    $('#btnEliminarSala').on('click', function () {
        let id = $(this).data('id');  // Obtén el ID de la sala almacenado en el botón
        console.log(id);
        $.ajax({
            url: 'modelo/EliminarSala.php',
            type: 'POST',
            data: { id: id },
            success: function (response) {
                console.log(response);
                $(`#sala-${id}`).remove();
                $('#EliminarSala').fadeOut();

                const msg = `
                <div class="alert show">
                    <span class="fa-solid fa-check"></span>
                    <span class="msg">Sala eliminada exitosamente</span>
                    <span class="close-btn">
                        <span class="fas fa-times"></span>
                    </span>
                </div>
                `;

                $('body').append(msg);

                // Mostrar y ocultar la alerta de éxito
                $('.alert').removeClass("hide");
                $('.alert').addClass("show");
                $('.alert').addClass("showAlert");
                setTimeout(function () {
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                }, 5000);

                $('.close-btn').click(function () {
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al eliminar la sala:', error);
            }
        });
    });
    //Eliminar-----------------------------------------------------------------


    //todo para editar la sala-----------------------------------------
    $('#formularioEditarSala').hide();
    $(document).on('click', '.btnEditar', function () {
        let salaId = $(this).data('id');  // Obtener el ID de la sala desde el botón
        $('#btnEditarSala').data('id', salaId);  // Asignar el ID al botón "Guardar cambios"

        // Cargar datos actuales de la sala en el formulario
        let nombreSala = $(`.sala[data-id='${salaId}'] .nombreSala`).text();
        let capacidadSala = $(`.sala[data-id='${salaId}'] .capacidadSala`).text();
        let recursosSala = $(`.sala[data-id='${salaId}'] .recursosSala`).text();

        $('#nombreSalaEditar').val(nombreSala);
        $('#capacidadSalaEditar').val(capacidadSala);
        $('#recursosSalaEditar').val(recursosSala);

        $('#formularioEditarSala').fadeIn();  // Mostrar el formulario
    });

    $('#btnCerrarEditar').on('click', function () {
        $('#formularioEditarSala').fadeOut();
    });

    $('#btnEditarSala').click(function () {
        let salaId = $(this).data('id');  // Obtener el ID de la sala
        let nombre = $('#nombreSalaEditar').val().trim();  // Obtener el nombre
        let capacidad = $('#capacidadSalaEditar').val().trim();  // Obtener la capacidad
        let recurso = $('#recursosSalaEditar').val().trim();  // Cambiar "recursos" a "recurso"
        let imagenInput = $('#imagenEditar')[0];  // Obtener el elemento de entrada de imagen
    
        // Verificar los valores
        if (!nombre || !capacidad || !recurso) {
            alert("Por favor, completa todos los campos.");
            return;  // Detener la ejecución si hay campos vacíos
        }
    
        let formData = new FormData();
        let imagen = null;
    
        // Verificar si el campo de imagen tiene archivos
        if (imagenInput && imagenInput.files && imagenInput.files.length > 0) {
            imagen = imagenInput.files[0];
        }
    
        if (imagen) {
            formData.append('imagenEditar', imagen);  // Cambiar a 'imagenEditar'
        }
    
        // Agregar los otros datos al FormData
        formData.append('salaId', salaId);
        formData.append('nombreEditar', nombre);  // Cambiar a 'nombreEditar'
        formData.append('capacidadEditar', capacidad);  // Cambiar a 'capacidadEditar'
        formData.append('recursoEditar', recurso);  // Cambiar a 'recursoEditar'
    
        // Realizar la solicitud AJAX
        $.ajax({
            url: 'modelo/EditarSala.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                var data = typeof response === "object" ? response : JSON.parse(response);
    
                if (data.error) {
                    // Mostrar mensaje de error
                    alert("Error al editar la sala");
                } else {
                    // Actualizar los elementos en la interfaz
                    $(`.sala[data-id='${salaId}'] .nombreSala`).text(data.nombre); // Actualiza el nombre desde la respuesta del servidor
                    $(`.sala[data-id='${salaId}'] .capacidadSala`).text(data.capacidad); // Actualiza la capacidad desde la respuesta del servidor
                    $(`.sala[data-id='${salaId}'] .recursosSala`).text(data.recursos); // Actualiza los recursos desde la respuesta del servidor
    
                    // Actualizar la imagen si se ha subido una nueva
                    if (imagen) {
                        const imagenUrl = URL.createObjectURL(imagen);
                        $(`.sala[data-id='${salaId}'] .imagenSala`).attr('src', imagenUrl);
                    }
    
                    // Mostrar mensaje de éxito
                    alert("Sala actualizada exitosamente");
                    $('#formularioEditarSala').fadeOut();  // Ocultar el formulario aquí
                }
    
                // Limpiar los valores del formulario después de editar
                $('#nombreSalaEditar').val('');
                $('#capacidadSalaEditar').val('');
                $('#recursosSalaEditar').val('');
                $('#imagenEditar').val('');  // Limpiar el campo de imagen
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la petición AJAX: ", textStatus, errorThrown);
            }
        });
    });
    
    

    //Editar-----------------------------------------------------------------


    // Función para agregar una sala al DOM
    function agregarSala(id, nombre, capacidad, recursos, imagen) {
        let salaHTML = `
    <div class="Sala" id="sala-${id}">  
        <div class="SalaInfo">
            <img src="${imagen}" alt="ImagenSala" class="SalaImagen">
            <div>
                <p>Nombre de sala: <span>${nombre}</span></p>
                <p>Capacidad de personas: <span>${capacidad}</span></p>
                <p>Recursos de sala: <span>${recursos}</span></p>
            </div>
        </div>
        <button class="Agendar" data-id="${id}">Agendar</button>
        <div class="Tapar"></div>`;
        // Mostrar botones de eliminar y editar solo si el usuario es 'operativo'
        if (userCargo === 'operativo') {
            salaHTML += `
        <div class="btnEliminar Eliminar" data-id="${id}">
            <img src="vista/img/eliminar.png" alt="eliminar" id="Eliminar">
        </div>
        <div class="btnEditar Editar" data-id="${id}">
            <img src="vista/img/lapiz.png" alt="editar" id="Editar">
        </div>`;
        }

        salaHTML += `</div>`;  // Cierra el div de Sala

        $('.ContenedorSalas').append(salaHTML);
    }


    $(document).off('click', '.Agendar').on('click', '.Agendar', function () {
        let salaId = $(this).data('id');
        let salaImagen = $(this).parent().find('.SalaImagen').attr('src');
        console.log("Agendar sala con ID: " + salaId);

        // Si ya existe un formulario visible, solo lo mostramos, no creamos uno nuevo
        if ($('.todo').length === 0) {
            $('.ContenedorSalas').append(`
                <div class="todo">
                    <div class="cerrar"><h1>x</h1></div>
                    <div class="container">
                        <!-- FORMULARIO -->
                        <div class="formularioDiv">
                            <!-- Imagen de salones -->
                            <div class="img">
                                <img src="${salaImagen}" alt="" class="salon">
                            </div>
                            <div>
                                <!-- Creación de formulario -->
                                <form method="post" enctype="multipart/form-data">
                                    <!-- Input de fecha -->
                                    <label for="fechaYHora" id="labelFechaYHora" class="label">Fecha y hora</label> <br>
                                    <input type="date" name="fecha" class="inputForm" id="fecha">
                                    <!-- Input de hora -->
                                    <input type="time" name="horaI" class="inputForm" id="horaI">
                                    <input type="time" name="horaF" class="inputForm" id="horaF">
                                    <!-- Input de insumos -->
                                    <label for="insumos" class="label">Insumos</label>
                                    <textarea name="insumos" class="inputForm" id="insumos"></textarea>
                                    <!-- Input de limpieza -->
                                    <label for="serLimpieza" class="label" id="servLimpieza">Servicio de limpieza</label>
                                    <label class="switch">
                                        <input type="checkbox" id="toggleSwitch">
                                        <span class="slider"></span>
                                    </label>
                                    <!-- Botón de agendar -->
                                    <button type="button" class="agendar" id="agendar" name="Agendar">Agendar</button>
                                </form>
                            </div>
                        </div>
                        <!-- CALENDARIO -->
                        <div class="calendarioDiv">
                            <!-- Vistas del calendario -->
                            <div class="vistas">
                                <button class="vista" id="diario"><h1>Día</h1></button>
                                <button class="vista" id="semanal"><h1>Semana</h1></button>
                                <button class="vista" id="mensual"><h1>Mes</h1></button>
                            </div>
                            
                            <!-- Control de días del calendario -->
                            <div class="row align-items-start" id="dias">
                                <div class="col">
                                    <div class="retroceder">
                                        <img src="vista/img/flecha-calendario-izquierda.png" alt="" class="flechaRetroceder">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="info">
                                        <!-- Día -->
                                        <h1 class="numDia-mes">24</h1>  
                                        <!-- Mes -->
                                        <h3 class="mes-anio">enero</h3>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="avanzar">
                                        <img src="vista/img/flecha-calendario-derecha.png" alt="" class="flechaAvanzar">
                                    </div>
                                </div>
                            </div>
    
                            <!-- Creación del calendario -->
                            <div class="calendario">
                                <div class="diasSemana">
                                    <div class="diaSemana" id="do"><h1>D</h1></div>
                                    <div class="diaSemana" id="lu"><h1>L</h1></div>
                                    <div class="diaSemana" id="ma"><h1>M</h1></div>
                                    <div class="diaSemana" id="mi"><h1>M</h1></div>
                                    <div class="diaSemana" id="ju"><h1>J</h1></div>
                                    <div class="diaSemana" id="vi"><h1>V</h1></div>
                                    <div class="diaSemana" id="sa"><h1>S</h1></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Manejo del clic para agendar
            $('#agendar').click(function () {
                let fecha = $('#fecha').val();
                let horaI = $('#horaI').val();
                let horaF = $('#horaF').val();
                let insumos = $('#insumos').val();
                let limpieza = $('#toggleSwitch').prop('checked');
                console.log(limpieza);
                let email = usuario;
                let sala = salaId;

                $.ajax({
                    url: 'modelo/AgregarReserva.php',
                    type: 'POST',
                    data: {
                        fecha: fecha,
                        horaI: horaI,
                        horaF: horaF,
                        insumos: insumos,
                        limpieza: limpieza,
                        email: email,
                        sala: sala
                    },
                    success: function (data) {
                        // Reserva realizada con éxito
                        const msg = `
                <div class="alert show">
                    <span class="fa-solid fa-check"></span>
                    <span class="msg">Sala reservada exitosamente</span>
                    <span class="close-btn">
                        <span class="fas fa-times"></span>
                    </span>
                </div>
                `;

                        $('body').append(msg);

                        // Mostrar y ocultar la alerta de éxito
                        $('.alert').removeClass("hide");
                        $('.alert').addClass("show");
                        $('.alert').addClass("showAlert");
                        setTimeout(function () {
                            $('.alert').removeClass("show");
                            $('.alert').addClass("hide");
                        }, 5000);

                        $('.close-btn').click(function () {
                            $('.alert').removeClass("show");
                            $('.alert').addClass("hide");
                        });

                        // Limpiar los valores del formulario después de agendar
                        $('#fecha').val('');
                        $('#horaI').val('');
                        $('#horaF').val('');
                        $('#insumos').val('');
                        $('#toggleSwitch').prop('checked', false);

                        // Ocultar el formulario
                        $('.todo').hide();
                    }
                });
            });

            // Cargar el calendario para la sala seleccionada
            calendario(salaId);
        } else {
            // Limpiar los valores del formulario antes de mostrarlo nuevamente
            $('#fecha').val('');
            $('#horaI').val('');
            $('#horaF').val('');
            $('#insumos').val('');
            $('#toggleSwitch').prop('checked', false);

            // Mostrar el formulario si ya existe
            $('.todo').show();
        }
    });


});



