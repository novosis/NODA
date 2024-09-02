$(document).ready(function() {
    function getAll() {
        $.ajax({
            url: 'Controlador/ObtenerUsuario.php',
            type: 'POST',
            dataType: 'json', // Indica que esperas una respuesta JSON
            data: { res: 1 },
            success: function(usuarios) { // La respuesta ya es un objeto JSON
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

    getAll();

    $('#buscar').on('input', function() {
        let terminoBusqueda = $(this).val();
        if (terminoBusqueda.length > 0) {
            $.ajax({
                url: 'Controlador/ObtenerUsuario.php',
                type: 'POST',
                dataType: 'json', // Indica que esperas una respuesta JSON
                data: {
                    res: 1,
                    busqueda: terminoBusqueda
                },
                success: function(usuarios) { // La respuesta ya es un objeto JSON
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
            getAll(); // Vuelve a cargar todos los usuarios si el campo de búsqueda está vacío
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var botonAgregar = document.getElementById('agregar');
    var divChico = document.getElementById('divchico');
    var formu = document.getElementById('formu');
    
    divChico.style.display = 'none';
    formu.style.display = 'none';
    
    botonAgregar.addEventListener('click', function() {
        if (divChico.style.display === 'none') {
            divChico.style.display = 'block';
            formu.style.display = 'block';
        } else {
            divChico.style.display = 'none';
            formu.style.display = 'none';
        }
    });
});
