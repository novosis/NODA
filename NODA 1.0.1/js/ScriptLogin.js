document.getElementById('signup').addEventListener('click', function() {
    var SignUp = document.getElementById('signup');
    var h1 = document.getElementById("h1");
    var usuario =document.getElementById("usuario");
    var passworrd=document.getElementById("password");
    var titulo =document.getElementById("titulo");
    var ingresar =document.getElementById("ingresar");
    SignUp.style.transition = 'all 0.5s ease';
    SignUp.style.transform = 'translateX(-137.5%)';
    SignUp.setAttribute('id', 'login');
    h1.innerHTML = "Login";
    usuario.style.display = "none";
    passworrd.style.display = "none";
    titulo.style.display = "none";
    ingresar.style.transform = "translatex(180%) translatey(770%)";
});

document.addEventListener('click', function() {
    if (event.target && event.target.id === 'login') {
        var login = document.getElementById('login');
        var h1 = document.getElementById("h1");
        login.style.transition = 'all 0.5s ease';
        login.style.transform = 'translateX(0%)';
        login.setAttribute('id', 'signup');
        h1.innerHTML = "Sign Up";
        usuario.style.display = "block";
        passworrd.style.display = "none";
        titulo.style.display = "none";
    }
});
