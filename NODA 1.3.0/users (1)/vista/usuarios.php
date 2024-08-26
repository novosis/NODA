
    <!DOCTYPE html>
<html lang="es">
    <head>
        <title>tarhetas</title>
		
		<script type="text/javascript" src="../controlador/js/jquery.min.js"></script>
	<link rel="stylesheet" href="css/usuarios.css">
	</head>

    <body>
        
    <div id="header">
        <div id="logo"></div>
        <div id="usuario"></div>
    </div>

<div id="escuela"><h3 id="pesc">Escuela</h3></div>
<div id="liceo"><h3 id="plic">Liceo</h3></div>


<div id="opciones">

<a href> <div id="inicio" class="tooltip">
        <span class="tooltiptext">Inicio</span>
      
    </div></a>
<a href> <div id="misReservas" class="tooltip">
        <span class="tooltiptext">Mis reservas</span>
      
    </div>       </a>
<a href> <div id="reservas" class="tooltip">
        <span class="tooltiptext">Reservas</span>
      
    </div></a>
<a href> <div id="usuarios" class="tooltip">
        <span class="tooltiptext">Ver perfiles</span>
      
    </div></a>
<a href> <div id="salas" class="tooltip">
        <span class="tooltiptext">Ver salas</span>
      
    </div></a>
</div>


	
		<form action="usuarios.php" method="post" id="formu">
	
<input type="email" name="email" id="Email" >
<button id="agregar"></button>

           </form>
<div id="divchico"></div>


<input type="text" name="buscar" placeholder="Buscar..." id="buscador">
<div id="iconbuscar"></div>
<div id="contenedor-tarjetas"></div>




<div id="data" class="card-container">





</div>




<script type="text/javascript" src="../controlador/js/functions.js"></script>


    </body>
</html>


  