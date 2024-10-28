document.addEventListener('DOMContentLoaded', function() {
    function addHoverEffect(elementSelector, textSelector) {
        const element = document.querySelector(elementSelector);
        const text = document.querySelector(textSelector);
        if (element && text) {
            element.addEventListener('mouseover', function() {
                text.style.opacity = '1';
            });
            element.addEventListener('mouseout', function() {
                text.style.opacity = '0';
            });
        }
    }

    // Menú Principal
    addHoverEffect('.Principal', '.nombreMenuPrincipal');

    // Agenda (Salas)
    addHoverEffect('.agenda', '.Salas');

    // Reservas (solo para operativo o líder)
    addHoverEffect('.reservas', '.Reservas');

    // Mis Reservas
    addHoverEffect('.misreservas', '.MisReservas');

    // Usuarios (Perfiles) (solo para operativo)
    addHoverEffect('#menuUsuarios', '.Usuarios');
});