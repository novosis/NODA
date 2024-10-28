function cerrarReservas() {

 
    $(".cerrarReservas").off().click(function() {
        $(".reservasDia").remove(); // Elimina el contenedor de reservas al hacer clic
    });
}

function calendario(id) {
    console.log(id);
    const salaId = id;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentWeekStart = new Date();

    $("#toggleSwitch").change(function() {
        console.log(this.checked ? "El botón está en ON" : "El botón está en OFF");
    });

    $("#diario").click(function() {
        $("#diario").css("background-color", "#3392FF");
        $("#semanal, #mensual").css("background-color", "#002C6F");
        renderDay(new Date());
    });

    $("#semanal").click(function() {
        $("#semanal").css("background-color", "#3392FF");
        $("#diario, #mensual").css("background-color", "#002C6F");
        renderWeek(currentWeekStart);
    });

    $("#mensual").click(function() {
        $("#mensual").css("background-color", "#3392FF");
        $("#diario, #semanal").css("background-color", "#002C6F");
        renderCalendar(currentMonth, currentYear);
    });

    $(".retroceder").click(function() {
        if ($("#mensual").css("background-color") === "rgb(51, 146, 255)"){
            currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            if (currentMonth === 11) currentYear--;
            renderCalendar(currentMonth, currentYear);
        } else {
            adjustWeekOrDay(-1);
        }
    });

    $(".avanzar").click(function() {
        if ($("#mensual").css("background-color") === "rgb(51, 146, 255)"){
            currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            if (currentMonth === 0) currentYear++;
            renderCalendar(currentMonth, currentYear);
        } else {
            adjustWeekOrDay(1);
        }
    });

    function adjustWeekOrDay(delta) {
        currentWeekStart.setDate(currentWeekStart.getDate() + delta * (delta === 1 ? 7 : 1));
        if ($("#semanal").css("background-color") === "rgb(51, 146, 255)"){
            renderWeek(currentWeekStart);
        } else {
            renderDay(currentWeekStart);
        }
    }

    function renderCalendar(month, year) {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysHTML = "";

        $(".numDia-mes").text(monthNames[month]);
        $(".mes-anio").text(year);
        $(".calendario").empty();

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

        for (let i = 0; i < firstDay; i++) {
            daysHTML += `<div class="divDiaVacia"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysHTML += `<div class="divDia"><p>${i}</p></div>`;
        }

        $(".calendario").append(daysHTML);
        $(".divDia").off().click(function () {
            $(".divDia").removeClass("selected");
            $(this).addClass("selected");
            let selectedDay = $(this).text();
            let fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
            console.log(fullDate);
            
            $("#fecha").val(fullDate);
           

            $(".reservas").empty(); // Limpiar reservas existentes
            
            // Crear y añadir el contenedor de reservas
            const reservasDiaHtml = `
                <div class="reservasDia">
                    <div class="cerrarReservas"><p class="cerrarX">X</p></div>
                    <p class="tituloReserva">Reservas del día ${selectedDay} de ${monthNames[month]} de ${year}</p>
                    <div class="reservas">
                        <!-- las reservas se añadirán aquí con AJAX -->    
                    </div>
                </div>
            `;
            
            $(".container").append(reservasDiaHtml);
            $(`#${id}`).on('click', function() {
            let salaId = $(this).data('id');
            console.log(salaId);
            });
            $.ajax({
                url: 'modelo/ObtenerReservaCalendario.php',
                type: 'GET',
                data: { date: fullDate, id: salaId
                 },
                success: function (data) {
                    console.log(data); // Imprimir la data en la consola
                    
                    if (Array.isArray(data) && data.length > 0) {
                        data.forEach(function(reserva) {
                            $(".reservas:last").append(`
                                <div class="reserva">
                                    <p>${reserva.nombre}</p>
                                    <p>${reserva.hora}</p>
                                </div>`);
                        });
                    } else {
                        $(".reservas:last").append(`<p>No hay reservas para este día.</p>`);
                    }
                },
                
            });
            
            cerrarReservas(); // Asegúrate de que esta función esté definida
            setTimeout(function() {
                $(".reservasDia").addClass("show");
            }, 10); 
        });
    }

    function renderWeek(weekStart) {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let daysHTML = "";
        let currentDay = new Date(weekStart);
        let firstDay = currentDay.getDay();
    
        $(".numDia-mes").text(currentDay.getDate());
        $(".mes-anio").text(`${monthNames[currentDay.getMonth()]} ${currentDay.getFullYear()}`);
        $(".calendario").empty();
        $(".calendario").css("padding-top", "15px");
    
        for (let i = 0; i < firstDay; i++) {
            daysHTML += `<div class="divDiaVaciaSem"></div>`;
        }
    
        for (let i = 0; i < 7; i++) {
            daysHTML += `<div class="divDiaSem">${currentDay.getDate()}</div>`;
            currentDay.setDate(currentDay.getDate() + 1);
        }
    
        $(".calendario").append(daysHTML);
    
        $(".divDiaSem").off().click(function () {
            $(".divDiaSem").removeClass("selected");
            $(this).addClass("selected");
            let selectedDay = $(this).text();
            let selectedDate = new Date(weekStart);
            selectedDate.setDate(weekStart.getDate() + $(this).index() - firstDay);
    
            let fullDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
            $("#fecha").val(fullDate);
        });
    }
    
    function renderDay(day) {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let selectedDate = new Date(day);
        $(".numDia-mes").text(selectedDate.getDate());
        $(".mes-anio").text(`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`);
        $(".calendario").empty();
        $(".calendario").append(`<div class="divDia">${selectedDate.getDate()}</div>`);

        $(".divDia").off().click(function () {
            $(this).addClass("selected");
            let fullDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
            $("#fecha").val(fullDate);
        });
    }

    renderCalendar(currentMonth, currentYear);
    $('.cerrar').click(function() {
        $('.todo').remove();
    });
}
