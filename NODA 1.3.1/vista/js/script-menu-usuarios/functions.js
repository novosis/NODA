$(document).ready(function() {
    // Función para cargar todos los registros desde el servidor
    function getAll() {
        $.ajax({
            url: '../Controlador/ObtenerUsuario.php', // Archivo PHP que maneja la obtención de datos
            type: 'POST',
            data: { res: 1 }, // Parámtero 'res' indica que se quieren obtener todos los registros
            success: function(response) {
                let usuarios = JSON.parse(response); // Convierte la respuesta JSON a un objeto JavaScript
                let ret = '';
                // Recorre los datos de los usuarios y genera el HTML para cada tarjeta
                usuarios.forEach(res => {
                    ret += `
                        <div class="card">
                            <div id="img"></div>
                            <div id="info">
                                <p>${res.nombre} ${res.apellido}</p>
                                <p>${res.cargo}</p>
                                <p id="pcorreo">${res.email}</p>
                            </div>
                            <div id="botones">
                                <button id="editar">Editar</button>
                                <button id="eliminar">Eliminar</button>
                            </div>
                        </div>
                    `;
                });
                $('#data').html(ret); // Actualiza el contenedor con las tarjetas generadas
            }
        });
    }

    // Llamada inicial para cargar todos los registros cuando la página se carga
    getAll();
});

// Evento para manejar la entrada en el campo de búsqueda
$('#buscador').on('input', function() {
    let terminoBusqueda = $(this).val(); // Obtiene el valor del campo de búsqueda
    
    if (terminoBusqueda.length > 0) {
        $.ajax({
            url: '../Controlador/ObtenerUsuario.php', // Archivo PHP que maneja la obtención de datos
            type: 'POST',
            data: {
                res: 1, // Parámtero 'res' para indicar que se quieren obtener registros filtrados
                busqueda: terminoBusqueda // Envía el término de búsqueda al servidor
            },
            success: function(response) {
                let usuarios = JSON.parse(response); // Convierte la respuesta JSON a un objeto JavaScript
                let ret = '';
                
                if (usuarios.length > 0) {
                    // Si hay resultados, genera el HTML para cada tarjeta
                    usuarios.forEach(res => {
                        ret += `
                            <div class="card">
                                <div id="img"></div>
                                <div id="info">
                                    <p>${res.nombre} ${res.apellido}</p>
                                    <p>${res.cargo}</p>
                                    <p>${res.email}</p>
                                </div>
                                <div id="botones">
                                    <button id="editar">Editar</button>
                                    <button id="eliminar">Eliminar</button>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    // Si no hay resultados, muestra un mensaje indicando que no se encontraron resultados
                    ret = '<p>No se encontraron resultados</p>';
                }
                
                $('#data').html(ret); // Actualiza el contenedor con las tarjetas generadas
            },
            error: function(xhr, status, error) {
                console.error('Error:', error); // Muestra un error en caso de que ocurra un problema con la solicitud
            }
        });
    } else {
        // Si el campo de búsqueda está vacío, limpia el contenedor de tarjetas
        $('#data').html('');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var botonAgregar = document.getElementById('agregar');
    var divChico = document.getElementById('divchico');
    var formu = document.getElementById('formu');
    
    // Asegúrate de que los elementos están ocultos al cargar
    divChico.style.display = 'none';
    formu.style.display = 'none';
    
    botonAgregar.addEventListener('click', function() {
        // Alterna la visibilidad entre 'block' y 'none'
        if (divChico.style.display === 'none') {
            divChico.style.display = 'block';
            formu.style.display = 'block';
        } else {
            divChico.style.display = 'none';
            formu.style.display = 'none';
        }
    });
});