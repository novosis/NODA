$(document).ready(function() {
    // Función para obtener todos los usuarios
    function getAll() {
        $.ajax({
            url: 'modelo/ObtenerUsuario.php',
            type: 'GET',
            dataType: 'json',
            data: { res: 1 },
            success: function(usuarios) {
                let ret = '';
                if (usuarios.length > 0) {
                    usuarios.forEach(res => {
                        // Asegúrate de que los datos estén completos
                        if (res.nombre && res.apellido && res.cargo && res.email) {
                            ret += `
                                <div class="card">
                                    <div id="img">
                                        <span class="iniciales">${res.iniciales}</span>
                                    </div>
                                    <div id="info">
                                        <p class="texto">${res.nombre} ${res.apellido}</p>
                                        <p class="texto">${res.cargo}</p>
                                        <p class="texto">${res.email}</p>
                                    </div>
                                    <div id="botones">
                                        <button id="editar">Editar</button>
                                        <button id="eliminar">Eliminar</button>
                                    </div>
                                </div>
                            `;
                        }
                    });
                } else {
                    ret = `
                        <div class="no-hay-usuarios">
                            <p class="texto-no-hay-usuarios">No hay usuarios existentes</p>
                        </div>`;
                }
                $('#data').html(ret);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    }

    // Función para eliminar un usuario
    $('#EliminarUsuario').hide();

    // Función para eliminar un usuario
    $(document).on('click', '#eliminar', function() {
        // Obtén el correo electrónico del usuario a eliminar desde el botón
        var email = $(this).closest('.card').find('.texto').last().text(); // Suponiendo que el email es el último elemento de texto en la tarjeta
        $('#btnEliminarUsuario').data('email', email); // Guarda el email en el botón de confirmación
        $('#EliminarUsuario').fadeIn(); // Muestra el modal de confirmación
    });

    // Cerrar el modal
    $('#btnCerrarEliminar').on('click', function() {
        $('#EliminarUsuario').fadeOut(); // Oculta el modal
    });

    // Confirmar eliminación
    $('#btnEliminarUsuario').on('click', function() {
        var email = $(this).data('email'); // Obtén el correo electrónico del botón de confirmación

        // Enviar la solicitud AJAX para eliminar el usuario
        $.ajax({
            url: 'modelo/EliminarUsuario.php',  // Ruta al archivo PHP que maneja la eliminación
            type: 'POST',
            data: { email: email },
            dataType: 'json',
            success: function(response) {
                // Manejar la respuesta del servidor
                if (response.status === 'success') {
                    $('#EliminarUsuario').fadeOut(); // Oculta el modal
                    getAll(); // Vuelve a cargar la lista de usuarios
                    if (response.status === 'success') {
                        const msg = `
                    <div class="alert show">
                        <span class="fa-solid fa-check"></span>
                        <span class="msg">${response.message}</span>
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
                       // Cierra el formulario
                       $('#formularioEditarReserva').fadeOut();
                    } else {
                        const msg = `
                        <div class="alert show">
                            <span class="fa-solid fa-check"></span>
                            <span class="msg">${response.message}</span>
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
                    }
                }
            },
            error: function() {
                alert('Hubo un problema al procesar la solicitud.');
            }
        });
    });


    // Función para obtener usuarios no registrados
    function NoRegistrados() {
        $.ajax({
            url: 'modelo/ObtenerUsuario.php',
            type: 'GET',
            dataType: 'json',
            data: { res: 1 },
            success: function(usuarios) {
                let ret = '';
                const usuariosFiltrados = usuarios.filter(res => !res.nombre || !res.apellido);
                
                if (usuariosFiltrados.length > 0) {
                    usuariosFiltrados.forEach(res => {
                        ret += `
                            <div class="card">
                                <div id="img">
                                    <span class="iniciales">${res.iniciales}</span>
                                </div>
                                <div id="info">
                                    <p class="texto">${res.nombre} ${res.apellido}</p>
                                    <p class="texto">${res.cargo}</p>
                                    <p class="texto">${res.email}</p>
                                </div>
                                <div id="botones">
                                    <button id="editar">Editar</button>
                                    <button id="eliminar">Eliminar</button>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    ret = `
                        <div class="no-hay-usuarios">
                            <p class="texto-no-hay-usuarios">No hay usuarios sin nombre o apellido.</p>
                        </div>`;
                }
                $('#data2').html(ret);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    }

    // Llamamos a getAll() para cargar todos los usuarios al iniciar
    getAll();

    // Búsqueda dinámica
    $('#buscar').on('input', function() {
        let terminoBusqueda = $(this).val();
        if (terminoBusqueda.length > 0) {
            $.ajax({
                url: 'modelo/ObtenerUsuario.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    res: 1,
                    busqueda: terminoBusqueda
                },
                success: function(usuarios) {
                    let ret = '';
                    if (usuarios.length > 0) {
                        usuarios.forEach(res => {
                            ret += `
                                <div class="card">
                                    <div id="img">
                                        <span class="iniciales">${res.iniciales}</span>
                                    </div>
                                    <div id="info">
                                        <p class="texto">${res.nombre} ${res.apellido}</p>
                                        <p class="texto">${res.cargo}</p>
                                        <p class="texto">${res.email}</p>
                                    </div>
                                    <div id="botones">
                                        <button id="editar">Editar</button>
                                        <button id="eliminar">Eliminar</button>
                                    </div>
                                </div>
                            `;
                        });
                    } else {
                        ret = `
                        <div class="no-hay-usuarios">
                            <p class="texto-no-hay-usuarios">No se encontraron resultados.</p>
                        </div>`;
                    }
                    $('#data').html(ret);
                },
                error: function(xhr, status, error) {
                    console.error('Error en la solicitud:', error);
                }
            });
        } else {
            getAll(); // Si el campo está vacío, vuelve a cargar todos los usuarios
        }
    });

    // Alternar entre usuarios registrados y no registrados
    $('.card-container2').fadeOut();
    $(document).on('click', '.NoRegistrados', function() {
        const $this = $(this);
        if ($this.text() === 'Usuarios no registrados') {
            $this.text('Usuarios registrados');
            $('.card-container').fadeIn();
            $('.card-container2').fadeOut();
        } else {
            $this.text('Usuarios no registrados');
            $('.card-container').fadeOut();
            NoRegistrados(); // Cargar solo los no registrados
            $('.card-container2').fadeIn();
        }
    });
});
