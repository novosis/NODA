const perfil = document.querySelector('.perfil');
const conteiner = document.querySelector('.container');
const cerrar = document.querySelector('.cerrar');
conteiner.removeChild(perfil);

document.querySelector(".usuario").addEventListener('click', function() {
    conteiner.appendChild(perfil);
});

cerrar.addEventListener('click', function() {
    conteiner.removeChild(perfil);
});