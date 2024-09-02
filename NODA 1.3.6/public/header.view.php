<?php

// Verifica si la sesión del usuario no está iniciada
if (!isset($_SESSION['usuario'])) {
    // Redirige al usuario a la página de inicio de sesión
    header('Location: ../login_registrar.php');
}

// obtine los datos del usuario de la sesión, si no están disponibles, asigna 'Nombre desconocido', 'Apellido desconocido' y 'Correo desconocido'
$nombre = isset($_SESSION['nombre']) ? ucwords(strtolower($_SESSION['nombre'])) : 'Nombre desconocido';
$apellido = isset($_SESSION['apellido']) ? ucwords(strtolower($_SESSION['apellido'])) : 'Apellido desconocido';
$email = isset($_SESSION['usuario']) ? $_SESSION['usuario'] : 'Correo desconocido';

// Obtiene las iniciales del nombre y apellido del usuario
$iniciales = strtoupper($nombre[0]) . strtoupper($apellido[0]);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vista/css/style-header/header.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700&display=swap">
</head>
<body>

    <div class="header">
        <!-- Logo que redirige al menú principal al hacer clic -->
        <img src="vista/img/logo a color 3.png" alt="Logo" class="logo" onclick="location.href='menuprincipal.php'">
        <div class="user-icon">
            <!-- Iniciales en el icono de usuario -->
            <div class="icon-iniciales">
                <?php echo $iniciales; ?>
            </div>
            <div class="dropdown">
                <!-- Icono de cerrar en el menú desplegable -->
                <div class="cruz"><img src="vista/img/cerrar.png" alt="" class="equisimg"></div>
                <div class="perfil">
                    <!-- Círculo con iniciales dentro del menú -->
                    <div class="inicialesheader">
                        <?php echo $iniciales; ?>
                    </div>
                    <!-- Muestra el nombre completo del usuario -->
                    <p class="username"><?php echo htmlspecialchars($nombre . ' ' . $apellido, ENT_QUOTES, 'UTF-8'); ?></p>
                    <!-- Muestra el email del usuario -->
                    <p class="email"><?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?></p>
                    <div class="botones">
                        <!-- Botón para editar el perfil -->
                        <button class="editar">Editar Perfil</button>
                        <!-- Botón para cerrar sesión -->
                        <button class="cerrar-sesion" onclick="location.href='cerrar.php'">Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Enlace al script de perfil -->
    <script src="vista/js/script-perfil/ScriptPerfil.js"></script>
</body>
</html>