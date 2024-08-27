
<!DOCTYPE html>
    <html lang="es">
        <head>
            <title>tarjetas</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
            <link rel="stylesheet" href="../vista/css/style-menu-usuarios/usuarios.css">
	    </head>
    <body>
        
    <div id="header">
        <div id="logo"></div>
        <div id="usuario"></div>
    </div>

    <div id="escuela">
        <h3 id="pesc">Escuela</h3>
    </div>
    <div id="liceo">
        <h3 id="plic">Liceo</h3>
    </div>


    <div id="opciones">
        <a href> 
            <div id="inicio" class="tooltip">
                <span class="tooltiptext">Inicio</span>
            </div>
        </a>

        <a href>   
            <div id="misReservas" class="tooltip">
                <span class="tooltiptext">Mis reservas</span>
            </div>       
        </a>

        <a href> 
            <div id="reservas" class="tooltip">
                <span class="tooltiptext">Reservas</span>
            </div>
        </a>
        
        <a href> 
            <div id="usuarios" class="tooltip">
                <span class="tooltiptext">Ver perfiles</span>
            </div>
        </a>

        <a href> 
            <div id="salas" class="tooltip">
                <span class="tooltiptext">Ver salas</span>
            </div>
        </a>
    </div>

		<form action="usuarios.php" method="post" id="formu">
            <input type="email" name="email" id="Email" >
        </form>

        <button id="agregar"></button>

        <div id="divchico"></div>

        <div class="buscador">
            <img src="../vista/img/check 1.png" alt="Icono de búsqueda" class="IconoBuscador">
            <input type="text" id="buscar" placeholder="Buscar usuarios..."> 
        </div>

        <div id="contenedor-tarjetas"></div>

        <div id="data" class="card-container"></div>

<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script type="text/javascript" src="../vista/js/script-menu-usuarios/functions.js"></script>
    </body>
</html>


  