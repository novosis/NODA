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

    // Función para obtener usuarios no registrados
    function getUnregistered() {
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
                                        <p class="texto">${res.nombre || 'Sin nombre'} ${res.apellido || 'Sin apellido'}</p>
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
            getUnregistered(); // Cargar solo los no registrados
            $('.card-container2').fadeIn();
        }
    });
});
