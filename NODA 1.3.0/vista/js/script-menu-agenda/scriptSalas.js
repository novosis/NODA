$(document).ready(function() {
    $.ajax({
        url: '../modelo/ObtenerSalas.php',
        type: 'GET',
        success: function(data) {
            let salas = JSON.parse(data);
            salas.forEach(function(sala) {
                agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
            });
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
    // Cargar las salas existentes desde el servidor
    $.ajax({
        url: '../controlador/ObtenerSalas.php',
        type: 'GET',
        success: function(data) {
            let salas = JSON.parse(data);
            salas.forEach(function(sala) {
                agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);
            });
        }
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

    // Agregar una nueva sala al hacer clic en "Guardar"
    $('#btnGuardarSala').on('click', function() {
        let formData = new FormData($('#formAgregarSala')[0]);

        $.ajax({
            url: '../controlador/AgregarSala.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                let sala = JSON.parse(response);
                agregarSala(sala.id, sala.nombre, sala.capacidad, sala.recursos, sala.imagen);

                // Cerrar el formulario
                $('#formularioAgregarSala').fadeOut();

                // Limpiar el formulario
                $('#formAgregarSala')[0].reset();
            }
        });
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
            <button class="Agendar" data-id="${id}">Agendar</button>
        </div>`;

        $('.ContenedorSalas').append(salaHTML);

        $('.Agendar').on('click', function() {
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
                                <img src="img/flecha-calendario-izquierda.png" alt="" class="flechaRetroceder">
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
                                <img src="img/flecha-calendario-derecha.png" alt="" class="flechaAvanzar">
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
            function calendario() {
                // Variables globales para la vista semanal y mensual
                let currentMonth = new Date().getMonth();
                let currentYear = new Date().getFullYear();
                let currentWeekStart = new Date(); // Inicia la semana en la fecha actual
            
                // Check box
                $("#toggleSwitch").change(function() {
                    if (this.checked) {
                        console.log("El botón está en ON");
                    } else {
                        console.log("El botón está en OFF");
                    }
                });
            
                // Eventos para cambiar de vista
                $("#diario").click(function() {
                    console.log("Diario clicked");
                    $("#diario").css("background-color", "#3392FF");
                    $("#semanal").css("background-color", "#002C6F");
                    $("#mensual").css("background-color", "#002C6F");
                    renderDay(new Date());
                });
            
                $("#semanal").click(function() {
                    console.log("Semanal clicked");
                    $("#diario").css("background-color", "#002C6F");
                    $("#semanal").css("background-color", "#3392FF");
                    $("#mensual").css("background-color", "#002C6F");
                    renderWeek(currentWeekStart);
                });
            
                $("#mensual").click(function() {
                    console.log("Mensual clicked");
                    $("#diario").css("background-color", "#002C6F");
                    $("#semanal").css("background-color", "#002C6F");
                    $("#mensual").css("background-color", "#3392FF");
                    renderCalendar(currentMonth, currentYear);
                });
            
                // Eventos para las flechas de avanzar y retroceder en la vista mensual
                $(".retroceder").click(function() {
                    if ($("#mensual").css("background-color") === "rgb(51, 146, 255)") {
                        if (currentMonth === 0) {
                            currentMonth = 11;
                            currentYear--;
                        } else {
                            currentMonth--;
                        }
                        renderCalendar(currentMonth, currentYear);
                    } else if ($("#semanal").css("background-color") === "rgb(51, 146, 255)") {
                        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
                        renderWeek(currentWeekStart);
                    } else if ($("#diario").css("background-color") === "rgb(51, 146, 255)") {
                        currentWeekStart.setDate(currentWeekStart.getDate() - 1);
                        renderDay(currentWeekStart);
                    }
                });
            
                $(".avanzar").click(function() {
                    if ($("#mensual").css("background-color") === "rgb(51, 146, 255)") {
                        if (currentMonth === 11) {
                            currentMonth = 0;
                            currentYear++;
                        } else {
                            currentMonth++;
                        }
                        renderCalendar(currentMonth, currentYear);
                    } else if ($("#semanal").css("background-color") === "rgb(51, 146, 255)") {
                        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
                        renderWeek(currentWeekStart);
                    } else if ($("#diario").css("background-color") === "rgb(51, 146, 255)") {
                        currentWeekStart.setDate(currentWeekStart.getDate() + 1);
                        renderDay(currentWeekStart);
                    }
                });
            
                // Función para hacer el calendario mensual
                function renderCalendar(month, year) {
                    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    let firstDay = new Date(year, month, 1).getDay(); // Primer día del mes
                    let daysInMonth = 32 - new Date(year, month, 32).getDate(); // Número de días en el mes
                    let daysHTML = "";
            
                    $(".numDia-mes").text(monthNames[month]);
                    $(".mes-anio").text(year);
                    $(".calendario").empty(); // Limpiar el calendario antes de renderizar
            
                    // Agregar los días de la semana (mantenerlos fijos)
                    $(".calendario").append(`
                        <div class="diasSemana">
                            <div class="diaSemana"><h1>D</h1></div>
                            <div class="diaSemana"><h1>L</h1></div>
                            <div class="diaSemana"><h1>M</h1></div>
                            <div class="diaSemana"><h1>M</h1></div>
                            <div class="diaSemana"><h1>J</h1></div>
                            <div class="diaSemana"><h1>V</h1></div>
                            <div class="diaSemana"><h1>S</h1></div>
                        </div>
                    `);
            
                    $(".diaSemana").css("display", "inline-block");
            
                    // Celdas vacías antes del primer día del mes
                    for (let i = 0; i < firstDay; i++) {
                        daysHTML += `<div class="divDiaVacia"></div>`;
                    }
            
                    // Días del mes actual
                    for (let i = 1; i <= daysInMonth; i++) {
                        daysHTML += `<div class="divDia">${i}</div>`;
                    }
            
                    $(".calendario").append(daysHTML);
            
                    // Agregar evento click a cada día
                    $(".divDia").click(function () {
                        $(".divDia").removeClass("selected");
                        $(this).addClass("selected");
                        let selectedDay = $(this).text();
                        let fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
                        $("#fecha").val(fullDate);
                        $(".container").append(
                            `<div class="reservasDia">
                                <div class="cerrarReservas"><p class="cerrarX">X</p></div>
                                <p class="tituloReserva">Reservas del día ${selectedDay} de ${monthNames[month]} de ${year}</p>
                                <div class="reservas">
                                    <!-- incluir las reservas con ajax -->    
                                </div>
                            </div>`
                        );
                        cerrarReservas();
                        setTimeout(function() {
                            $(".reservasDia").addClass("show");
                        }, 10); 
                    });
                }
            
                function renderWeek(weekStart) {
                    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    let daysHTML = "";
                    let currentDay = new Date(weekStart);
                    
                    // Obtener el día de la semana en que empieza la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
                    let firstDay = currentDay.getDay();
                
                    $(".numDia-mes").text(currentDay.getDate());
                    $(".mes-anio").text(`${monthNames[currentDay.getMonth()]} ${currentDay.getFullYear()}`);
                    $(".calendario").empty(); // Limpiar el calendario antes de renderizar
                    $(".calendario").css("padding-top", "15px");
                
                    // Celdas vacías antes del primer día de la semana
                    for (let i = 0; i < firstDay; i++) {
                        daysHTML += `<div class="divDiaVaciaSem"></div>`;
                    }
                
                    // Días de la semana
                    for (let i = 0; i < 7; i++) {
                        daysHTML += `<div class="divDiaSem">${currentDay.getDate()}</div>`;
                        currentDay.setDate(currentDay.getDate() + 1);
                    }
                
                    $(".calendario").append(daysHTML);
                
                    // Agregar evento click a cada día de la semana
                    $(".divDiaSem").click(function () {
                        $(".divDiaSem").removeClass("selected");
                        $(this).addClass("selected");
                        // Calcula la fecha completa a partir del día seleccionado
                        let selectedDay = $(this).text();
                        let selectedDate = new Date(weekStart);
                        selectedDate.setDate(weekStart.getDate() + $(this).index() - firstDay);
                
                        let fullDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
                        $("#fecha").val(fullDate);
                    });
                }
                
                // Función para hacer la vista diaria
                function renderDay(day) {
                    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    let selectedDate = new Date(day);
                    $(".numDia-mes").text(selectedDate.getDate());
                    $(".mes-anio").text(`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`);
                    $(".calendario").empty(); // Limpiar el calendario antes de renderizar
                    $(".calendario").append(`<div class="divDia">${selectedDate.getDate()}</div>`);
                
                    $(".divDia").click(function () {
                        $(this).addClass("selected");
                        let fullDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
                        $("#fecha").val(fullDate);
                    });
                }
            
                function cerrarReservas() {
                    $(".cerrarX").click(function () {
                        $(".reservasDia").removeClass("show");
                        setTimeout(function () {
                            $(".reservasDia").remove();
                        }, 300);
                    });
                }
            
                // Inicializa el calendario en vista mensual
                renderCalendar(currentMonth, currentYear);
        
                $('.cerrar').click(function(){
                    $('.todo').remove();
                });
        
        
                }
        });
        }
        
        });




      