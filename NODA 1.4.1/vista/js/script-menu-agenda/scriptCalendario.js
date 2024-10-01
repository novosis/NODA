
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
            daysHTML += `<div class="divDia">
            <p>${i}</p>
            </div>`;
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