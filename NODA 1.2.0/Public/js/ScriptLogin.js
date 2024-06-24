const conteiner = document.querySelector('.Container');
const form = document.getElementById('form');
const usuario = document.getElementById("usuario");
const divlogin = document.querySelector('.DivLogin'); 
const passworrd=document.getElementById("password");
const titulo =document.getElementById("titulo");
const candadoicon =document.querySelector(".candado");
const divsignup = document.querySelector('.DivSignUp');
const form2 = document.getElementById('form2');
const usuarioicon =document.querySelector(".usuario");
const titulo2 =document.getElementById("titulo2");
const cargo =document.querySelector(".cargo");
const usuario2= document.querySelector(".usuario2");
const candado2 = document.querySelector(".candado2");

divsignup.removeChild(form2);
divsignup.removeChild(titulo2);
conteiner.removeChild(usuario2);
conteiner.removeChild(candado2);
conteiner.removeChild(cargo);


const transaparente1 = document.createElement('transparente1');
transaparente1.setAttribute('id', 'transparente1');
transaparente1.style.marginTop = "3px";
transaparente1.style.width= "250px";
transaparente1.style.height= "394px";
transaparente1.style.background= "transparent";
transaparente1.style.boxSizing="border-box";
transaparente1.style.borderRadius="85px";
transaparente1.style.position= "absolute";
transaparente1.style.left="57.9%";
transaparente1.style.cursor="pointer";
conteiner.appendChild(transaparente1);

const transaparente2 = document.createElement('transparente2');
transaparente2.setAttribute('id', 'transparente2');
transaparente2.style.marginTop = "3px";
transaparente2.style.width= "250px";
transaparente2.style.height= "394px";
transaparente2.style.background= "transparent";
transaparente2.style.boxSizing="border-box";
transaparente2.style.borderRadius="85px";
transaparente2.style.position= "absolute";
transaparente2.style.left="3px";
transaparente2.style.cursor="pointer";



document.getElementById('transparente1').addEventListener('click', function() {
    var transaparente1 = document.getElementById('transparente1');
    var SignUp = document.getElementById('signup');
    var h1 = document.getElementById("h1");
    var usuario =document.getElementById("usuario");
    var passworrd=document.getElementById("password");
    var titulo =document.getElementById("titulo");
    conteiner.appendChild(transaparente2);
    conteiner.removeChild(transaparente1);
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

document.addEventListener('click', function() {
    if (event.target && event.target.id === 'transparente2') {
        var login = document.getElementById('login');
        var h1 = document.getElementById("h1");
        conteiner.appendChild(transaparente1);
        conteiner.removeChild(transaparente2);
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

