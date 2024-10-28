$(document).ready(function() {
    // Función para obtener todos los usuarios y cargos
    function getAll() {
        $.ajax({
            url: 'modelo/ObtenerUsuario.php',
            type: 'GET',
            dataType: 'json',
            data: { res: 1 },
            success: function(response) {
                let ret = '';
                if (response.usuarios && response.usuarios.length > 0) {
                    response.usuarios.forEach(res => {
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

                // Actualizar el select de cargos
                actualizarSelectCargos(response.cargos);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    }

    // Función para actualizar el select de cargos
    function actualizarSelectCargos(cargos) {
        let selectCargo = $('#cargo');
        selectCargo.empty();
        selectCargo.append('<option value="">Selecciona un cargo</option>');

        if (cargos && Array.isArray(cargos)) {
            cargos.forEach(function(cargo) {
                if (cargo && cargo.trim() !== '') {
                    selectCargo.append($('<option></option>').attr('value', cargo).text(cargo));
                }
            });
        }
    }

    // Función para eliminar un usuario
    $('#EliminarUsuario').hide();

    $(document).on('click', '#eliminar', function() {
        var email = $(this).closest('.card').find('.texto').last().text();
        $('#btnEliminarUsuario').data('email', email);
        $('#EliminarUsuario').fadeIn();
    });

    $('#btnCerrarEliminar').on('click', function() {
        $('#EliminarUsuario').fadeOut();
    });

    $('#btnEliminarUsuario').on('click', function() {
        var email = $(this).data('email');

        $.ajax({
            url: 'modelo/EliminarUsuario.php',
            type: 'POST',
            data: { email: email },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    $('#EliminarUsuario').fadeOut();
                    getAll();
                    mostrarAlerta(response.message, 'success');
                } else {
                    mostrarAlerta(response.message, 'error');
                }
            },
            error: function() {
                mostrarAlerta('Hubo un problema al procesar la solicitud.', 'error');
            }
        });
    });

    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        const alertaClase = tipo === 'success' ? 'alert-success' : 'alert-error';
        const alertaHTML = `
            <div class="alert ${alertaClase} show">
                <span class="fa-solid ${tipo === 'success' ? 'fa-check' : 'fa-times'}"></span>
                <span class="msg">${mensaje}</span>
                <span class="close-btn">
                    <span class="fas fa-times"></span>
                </span>
            </div>
        `;

        $('body').append(alertaHTML);

        $('.alert').removeClass("hide").addClass("show showAlert");
        setTimeout(function () {
            $('.alert').removeClass("show").addClass("hide");
        }, 5000);

        $('.close-btn').click(function () {
            $(this).closest('.alert').removeClass("show").addClass("hide");
        });
    }

    // Editar usuario
$('#formularioEditarUsuario').hide();

$(document).on('click', '#editar', function() {
    var card = $(this).closest('.card');
    var nombreCompleto = card.find('.texto').eq(0).text().trim();
    var nombrePartes = nombreCompleto.split(' ');
    var nombre = nombrePartes[0];
    var apellido = nombrePartes.slice(1).join(' ');
    var cargo = card.find('.texto').eq(1).text().trim();
    var email = card.find('.texto').eq(2).text().trim();

    $('#nombre').val(nombre);
    $('#apellido').val(apellido);
    $('#email').val(email);
    $('#cargo').val(cargo);
    $('#emailOriginal').val(email); // Guardamos el email original para identificar al usuario

    $('#formularioEditarUsuario').fadeIn();
});

$('#btnCerrarFormulario').on('click', function() {
    $('#formularioEditarUsuario').fadeOut();
});

$('#formEditarUsuario').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: 'modelo/EditarUsuario.php',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                $('#formularioEditarUsuario').fadeOut();
                getAll();
                mostrarAlerta(response.message, 'success');
            } else {
                mostrarAlerta(response.message, 'error');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
            console.error('Respuesta del servidor:', xhr.responseText);
            mostrarAlerta('Hubo un problema al procesar la solicitud.', 'error');
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
            success: function(response) {
                let ret = '';
                const usuariosFiltrados = response.usuarios.filter(res => !res.nombre || !res.apellido);
                
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
                success: function(response) {
                    let ret = '';
                    if (response.usuarios && response.usuarios.length > 0) {
                        response.usuarios.forEach(res => {
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
            getAll();
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
            NoRegistrados();
            $('.card-container2').fadeIn();
        }
    });
});

// Manejo del formulario de agregar usuario
document.addEventListener('DOMContentLoaded', function() {
    let botonAgregar = document.getElementById('agregar');
    let formu = document.getElementById('formu');

    formu.classList.remove('visible');

    botonAgregar.addEventListener('click', function() {
        if (formu.classList.contains('visible')) {
            formu.classList.remove('visible');
            setTimeout(() => {
                formu.style.display = 'none'; 
            }, 500); 
        } else {
            formu.style.display = 'block'; 
            setTimeout(() => {
                formu.classList.add('visible'); 
            }, 10); 
        }
    });
});