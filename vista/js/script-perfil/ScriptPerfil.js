// Maneja el clic en el ícono de usuario para mostrar/ocultar el dropdown
document.querySelector('.user-icon').addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que el clic en el ícono cierre el dropdown
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
});

// Maneja el clic en la clase cruz para cerrar el dropdown
document.querySelector('.cruz').addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que el clic en el botón cierre el dropdown
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = 'none';
});

// Maneja el clic en el dropdown para evitar que se cierre cuando se hace clic dentro de él
document.querySelector('.dropdown').addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que el clic dentro del dropdown cierre el dropdown
});

// Maneja el clic en cualquier parte del documento para cerrar el dropdown
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const userIcon = document.querySelector('.user-icon');

    // Verifica si el clic ocurrió fuera del dropdown y del ícono de usuario
    if (!dropdown.contains(event.target) && !userIcon.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

$('#formularioEditar').hide();
    // Mostrar el formulario al hacer clic en "Agregar Sala"
    $('#editarPerfil').on('click', function() {
        $('#formularioEditar').fadeIn(); // Mostrar el formulario con un efecto de desvanecimiento
    });

    // Cerrar el formulario al hacer clic en "Cerrar"
    $('#btnCerrarFormularioEditar').on('click', function() {
        $('#formularioEditar').fadeOut();
    });