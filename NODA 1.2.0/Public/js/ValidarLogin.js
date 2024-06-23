const nombreH3 = document.getElementById('nombre');
const cargoH3 = document.getElementById('cargo');

document.getElementById('ingresar').addEventListener('click', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    if (usuario === 'admin@gmail.com' && password === 'admin') {
        
        window.location.href = "../Public/Index.php";
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
