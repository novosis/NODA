document.querySelector('.user-icon').addEventListener('click', function(event) {
    event.stopPropagation();
    const Perfil = document.querySelector('.Perfil');
    Perfil.style.display = Perfil.style.display === 'none' || Perfil.style.display === '' ? 'block' : 'none';
});

document.querySelector('.cruz').addEventListener('click', function(event) {
    event.stopPropagation();
    const Perfil = document.querySelector('.Perfil');
    Perfil.style.display = 'none';
});

document.querySelector('.Perfil').addEventListener('click', function(event) {
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    const Perfil = document.querySelector('.Perfil');
    const userIcon = document.querySelector('.user-icon');

    if (!Perfil.contains(event.target) && !userIcon.contains(event.target)) {
        Perfil.style.display = 'none';
    }
});

$('#formularioEditar').hide();

$('#editarPerfil').on('click', function(event) {
    $('#formularioEditar').fadeIn();
});

$('#btnCerrarFormularioEditar').on('click', function(event) {
    event.stopPropagation();
    $('#formularioEditar').fadeOut();
});