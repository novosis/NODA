const conteiner = document.querySelector('.Container');
const form = document.getElementById('form');
const usuario = document.getElementById("usuario");
const divlogin = document.querySelector('.DivLogin'); 
const password = document.getElementById("password");
const titulo = document.getElementById("titulo");
const candadoicon = document.querySelector(".candado");
const divsignup = document.querySelector('.DivSignUp');
const form2 = document.getElementById('form2');
const usuarioicon = document.querySelector(".usuario");
const titulo2 = document.getElementById("titulo2");
const cargo = document.querySelector(".cargo");
const usuario2 = document.querySelector(".usuario2");
const candado2 = document.querySelector(".candado2");

divsignup.removeChild(form2);
divsignup.removeChild(titulo2);
conteiner.removeChild(usuario2);
conteiner.removeChild(candado2);
conteiner.removeChild(cargo);

const transparente1 = document.createElement('div');  // Cambié a 'div'
transparente1.setAttribute('id', 'transparente1');
transparente1.style.marginTop = "3px";
transparente1.style.width= "250px";
transparente1.style.height= "394px";
transparente1.style.background= "transparent";
transparente1.style.boxSizing="border-box";
transparente1.style.borderRadius="85px";
transparente1.style.position= "absolute";
transparente1.style.left="57.9%";
transparente1.style.cursor="pointer";
conteiner.appendChild(transparente1);

const transparente2 = document.createElement('div');  // Cambié a 'div'
transparente2.setAttribute('id', 'transparente2');
transparente2.style.marginTop = "3px";
transparente2.style.width= "250px";
transparente2.style.height= "394px";
transparente2.style.background= "transparent";
transparente2.style.boxSizing="border-box";
transparente2.style.borderRadius="85px";
transparente2.style.position= "absolute";
transparente2.style.left="3px";
transparente2.style.cursor="pointer";

document.getElementById('transparente1').addEventListener('click', function() {
    var SignUp = document.getElementById('signup');
    var h1 = document.getElementById("h1");
    conteiner.appendChild(transparente2);
    conteiner.removeChild(transparente1);
    SignUp.style.transition = 'all 0.5s ease';
    SignUp.style.transform = 'translateX(-137.5%)';
    SignUp.setAttribute('id', 'login');
    h1.innerHTML = "Login";
    divsignup.appendChild(titulo2);
    divsignup.appendChild(form2);
    conteiner.appendChild(usuario2);
    conteiner.appendChild(candado2);
    conteiner.appendChild(cargo);
    divlogin.removeChild(titulo);
    divlogin.removeChild(form);
    conteiner.removeChild(usuarioicon);
    conteiner.removeChild(candadoicon);    
});

document.addEventListener('click', function(event) {  // Añadí 'event' aquí
    if (event.target && event.target.id === 'transparente2') {
        var login = document.getElementById('login');
        var h1 = document.getElementById("h1");
        conteiner.appendChild(transparente1);
        conteiner.removeChild(transparente2);
        login.style.transition = 'all 0.5s ease';
        login.style.transform = 'translateX(0%)';
        login.setAttribute('id', 'signup');
        h1.innerHTML = "Sign Up";
        usuario.style.display = "block";
        divlogin.appendChild(titulo);
        divlogin.appendChild(form);
        conteiner.appendChild(usuarioicon);
        conteiner.appendChild(candadoicon);
        divsignup.removeChild(form2);
        divsignup.removeChild(titulo2);
        conteiner.removeChild(usuario2);
        conteiner.removeChild(candado2);
        conteiner.removeChild(cargo);
    }
});
