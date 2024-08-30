CREATE DATABASE novosis_NODA;
USE novosis_NODA;

CREATE TABLE usuario (
    email VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE espacio (
    id_espacio INT AUTO_INCREMENT PRIMARY KEY,
    nom_sala VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(50),
    imagen VARCHAR(255) UNIQUE
) ENGINE=InnoDB;

CREATE TABLE reserva (
    id_auto INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_i TIME NOT NULL,
    hora_f TIME NOT NULL,
    observaciones VARCHAR(500),
    fk_email VARCHAR(50) NOT NULL,
    fk_id_e INT NOT NULL,
    FOREIGN KEY (fk_email) REFERENCES usuario(email),
    FOREIGN KEY (fk_id_e) REFERENCES espacio(id_espacio)
) ENGINE=InnoDB;

CREATE TABLE recurso (
    id_r INT AUTO_INCREMENT PRIMARY KEY,
    nom_r VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE contiene (
    id_c INT AUTO_INCREMENT PRIMARY KEY,
    cant INT,
    fk_id_r INT NOT NULL,
    fk_email VARCHAR(255) NOT NULL,
    fk_id_auto INT NOT NULL,
    fk_id_e INT NOT NULL,
    FOREIGN KEY (fk_email) REFERENCES usuario (email),
    FOREIGN KEY (fk_id_e) REFERENCES espacio (id_espacio),
    FOREIGN KEY (fk_id_r) REFERENCES recurso (id_r),
    FOREIGN KEY (fk_id_auto) REFERENCES reserva (id_auto)
) ENGINE=InnoDB;

-- Insert de la tabla de usuarios
INSERT INTO usuario (email, nombre, apellido, password, cargo) VALUES 
('rlockhar@impulso.edu.uy', 'Richard', 'Lockhart', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'operativo'),
('ldelossantos@impulso.edu.uy', 'Leticia', 'de los Santos', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'docente'),
('bfulquere@impulso.edu.uy', 'Belen', 'Fulquere', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'tutor'),
('dfoliatti@impulso.edu.uy', 'Diego', 'Foliatti', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'director'),
('erattin@impulso.edu.uy', 'Erwin', 'Rattin', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'director'),
('fpatritti@impulso.edu.uy', 'Fabrizio', 'Patriti', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'director'),
('aaliandre@impulso.edu.uy', 'Anibal', 'Aliandre', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'ebi'),
('bmoure@impulso.edu.uy', 'Bernadette', 'Moure', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'docente'),
('ntorres@impulso.edu.uy', 'Natalia', 'Torres', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'docente'),
('pbonilla@impulso.edu.uy', 'Pablo', 'Bonilla', 'c764507e78bd93111da214cd3bc08d905c93079f4d47c44314b2088d08765e5b77d890f5f9e114ff6476de5faf39a0f838da010e1ace49242136352f060b4f45', 'tutor');

-- Insert de la tabla de espacios
INSERT INTO espacio (nom_sala, capacidad, estado, imagen) VALUES
('salon 7A', 30, 'disponible', 'vista/img/Salon7A.jpeg'),
('biblioteca', 15, 'disponible', 'vista/img/Biblioteca.jpeg'),
('sala informatica', 30, 'disponible', 'vista/img/SalaInformatica.jpeg'),
('sala reuniones', 6, 'disponible', 'vista/img/SalonReuniones.jpeg'),
('laboratorio Q', 30, 'disponible', 'vista/img/LaboratorioQuimica.jpeg'),
('laboratorio F', 30, 'disponible', 'vista/img/LaboratorioFisica.jpeg'),
('sala Arte', 30, 'disponible', 'vista/img/Arte.jpeg'),
('taller informatica', 30, 'disponible', 'vista/img/TallerInfo.jpeg'),
('salon tecnologico', 30, 'disponible', 'vista/img/SalonTecnologico.jpeg'),
('Comedor', 200, 'disponible', 'vista/img/Comedor.jpeg');

-- Insert de la tabla de reservas
INSERT INTO reserva (fecha, hora_i, hora_f, observaciones, fk_email, fk_id_e) VALUES
('2024-08-15', '18:20', '20:35', 'necesito 15 laptops con cargadores y 3 zapatillas', 'ntorres@impulso.edu.uy', 3),
('2024-08-16', '20:35', '21:20', NULL, 'ntorres@impulso.edu.uy', 8),
('2024-08-27', '16:15', '17:35', NULL, 'bfulquere@impulso.edu.uy', 5),
('2024-08-30', '10:00', '12:15', 'necesito cafe y 4 tazas', 'fpatritti@impulso.edu.uy', 4),
('2024-08-23', '15:30', '17:35', 'necesito algunas mesas en forma de U y que a las 16:30 saque una merienda para 20 personas, torta y cafe', 'rlockhar@impulso.edu.uy', 10);

-- Insert de la tabla de recursos
INSERT INTO recurso (nom_r, descripcion) VALUES
('laptops', 'con carga al 100'),
('cafe', 'que este bien caliente'),
('mesas', NULL),
('aperitivos', 'torta dulce'),
('sillas', 'necesito 30'),
('pizarras', '2 pizarras y 4 marcadores'),
('manteles', '5 blancos'),
('decoraciones', 'cortina de colores, globo y confeti'),
('utiles', 'lapiceras y papel'),
('bebidas', 'botellas de refresco y/o agua');

-- Insert de la tabla de contiene
INSERT INTO contiene (cant, fk_id_r, fk_email, fk_id_auto, fk_id_e) VALUES
(NULL, 5, 'bfulquere@impulso.edu.uy', 3, 5),
(2, 8, 'fpatritti@impulso.edu.uy', 4, 4),
(4, 6, 'ntorres@impulso.edu.uy', 1, 3),
(30, 9, 'ntorres@impulso.edu.uy', 2, 8),
(50, 4, 'rlockhar@impulso.edu.uy', 5, 10);
