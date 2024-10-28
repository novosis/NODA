$(document).ready(function() {
    // Función para obtener todos los usuarios
    function getAll() {
        $.ajax({
            url: 'modelo/ObtenerUsuario.php',
            type: 'GET', // Usamos GET en lugar de POST
            dataType: 'json', // Esperamos una respuesta JSON
            data: { res: 1 },
            success: function(usuarios) { // La respuesta es un array de usuarios
                let ret = '';
                if (usuarios.length > 0) {
                    usuarios.forEach(res => {
                        ret += `
                            <div class="card">
                                <div id="img">
                                    <span class="iniciales">${res.iniciales}</span> <!-- Muestra las iniciales -->
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

    // Llamamos a getAll() para cargar todos los usuarios al iniciar
    getAll();

    // Búsqueda dinámica cuando se ingresa un término
    $('#buscar').on('input', function() {
        let terminoBusqueda = $(this).val();
        if (terminoBusqueda.length > 0) {
            $.ajax({
                url: 'modelo/ObtenerUsuario.php', // Asegúrate de que la ruta sea correcta
                type: 'GET', // Usamos GET
                dataType: 'json', // Esperamos respuesta JSON
                data: {
                    res: 1,
                    busqueda: terminoBusqueda // Enviamos el término de búsqueda
                },
                success: function(usuarios) {
                    let ret = '';
                    if (usuarios.length > 0) {
                        usuarios.forEach(res => {
                            ret += `
                                <div class="card">
                                    <div id="img">
                                        <span class="iniciales">${res.iniciales}</span> <!-- Muestra las iniciales -->
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
});

document.addEventListener('DOMContentLoaded', function() {
    let botonAgregar = document.getElementById('agregar');
    let formu = document.getElementById('formu');

    // Oculta el formulario inicialmente
    formu.classList.remove('visible');

    // Alterna la visibilidad del formulario al hacer clic en el botón
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

