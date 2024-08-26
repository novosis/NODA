CREATE DATABASE novosis_NODA;
USE novosis_NODA;

CREATE TABLE usuario (
    correo VARCHAR (30) PRIMARY KEY,
    nombre VARCHAR (20) NOT NULL,
    apellido VARCHAR (20) NOT NULL,
    contra VARCHAR (32) NOT NULL,
  cargo VARCHAR (20)NOT NULL
);

CREATE TABLE espacio (
    id_espacio INT AUTO_INCREMENT PRIMARY KEY,
    nom_sala VARCHAR (20) NOT NULL,
    capacidad INT (2) NOT NULL,
    estado VARCHAR (15)
);

CREATE TABLE reserva (
    id_auto INT (4) PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_i TIME NOT NULL,
    hora_f TIME NOT NULL,
    observaciones VARCHAR (500),
    fk_correo VARCHAR (30) NOT NULL,
    fk_id_e INT (4) NOT NULL,
    FOREIGN KEY (fk_correo) REFERENCES usuario (correo),
    FOREIGN KEY (fk_id_e) REFERENCES espacio (id_espacio)
);

CREATE TABLE recurso (
    id_r INT (4) PRIMARY KEY,
    nom_r VARCHAR (15) NOT NULL,
    descripcion VARCHAR (50) 
);

CREATE TABLE contiene (
    id_c INT(4) PRIMARY KEY,
    cant INT (3),
    fk_id_r INT (4) NOT NULL,
    fk_correo VARCHAR (30) NOT NULL,
    fk_id_auto INT (4) NOT NULL,
    fk_id_e INT (4) NOT NULL,
    FOREIGN KEY (fk_correo) REFERENCES usuario (correo),
    FOREIGN KEY (fk_id_e) REFERENCES espacio (id_espacio),
    FOREIGN KEY (fk_id_r) REFERENCES recurso (id_r),
    FOREIGN KEY (fk_id_auto) REFERENCES reserva (id_auto)
);

INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `contra`, `cargo`) VALUES ('rlockhar@impulso.edu.uy', 'Richard', 'Lockhart', 'Impulso2024', 'operario');
INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `contra`, `cargo`) VALUES ('ldelossantos@impulso.edu.uy', 'Leticia', 'de los Santos', 'Impulso2024', 'docente');
INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `contra`, `cargo`) VALUES  ('bfulquere@impulso.edu.uy', 'Belen', 'Fulquere', 'Impulso2024', 'tutor');
INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `contra`, `cargo`) VALUES  ('dfoliatti@impulso.edu.uy', 'Diego', 'Foliatti', 'Impulso2024', 'director');

INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0001', 'salon 7A', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0003', 'biblioteca', '15', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0016', 'sala informatica', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0020', 'sala reuniones', '6', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0022', 'laboratorio Q', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0050', 'laboratorio F', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0024', 'sala Arte ', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0030', 'taller informatica', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0045', 'salon tecnologico', '30', 'disponible');
INSERT INTO `espacio` (`id_espacio`, `nom_sala`, `capacidad`, `estado`) VALUES ('0019', 'Comedor ', '200', 'disponible');


INSERT INTO `reserva` (`id_auto`, `fecha`, `hora_i`, `hora_f`, `observaciones`, `fk_correo`, `fk_id_e`) VALUES ('0001', '2024-08-15', '18:20:00', '20:35:00', 'necesito 15 laptops con cargadores y 3 zapatillas', 'natorres@impulso.edu.uy', '0003');
INSERT INTO `reserva` (`id_auto`, `fecha`, `hora_i`, `hora_f`, `observaciones`, `fk_correo`, `fk_id_e`) VALUES ('0002', '2024-08-16', '20:35:00', '21:20:00', NULL, 'natorres@impulso.edu.uy', '0030');
INSERT INTO `reserva` (`id_auto`, `fecha`, `hora_i`, `hora_f`, `observaciones`, `fk_correo`, `fk_id_e`) VALUES ('0003', '2024-08-27', '16:15:00', '17:35:00', NULL, 'bfulquere@impulso.edu.uy', '0022');
INSERT INTO `reserva` (`id_auto`, `fecha`, `hora_i`, `hora_f`, `observaciones`, `fk_correo`, `fk_id_e`) VALUES ('0004', '2024-08-30', '10:00:00', '12:15:00', 'necesito cafe y 4 tazas ', 'fpatritti@impulso.edu.uy', '0020');
INSERT INTO `reserva` (`id_auto`, `fecha`, `hora_i`, `hora_f`, `observaciones`, `fk_correo`, `fk_id_e`) VALUES ('0005', '2024-08-23', '15:30:00', '17:35:00', 'necesito algunas mesas en forma de U y que a alas 16:30 saque una merienda para 20 personas, torta y cafe. ', 'rlockhart@impulso.edu.uy', '0019');

INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0001', 'laptops', 'con carga al 100');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0002', 'cafe', 'que este bien caliente');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0003', 'mesas', NULL);
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0004', 'aperitivos', 'torta dulce');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0005', 'sillas', 'necesito 30');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0006', 'pizarras', '2 pizarras y 4 marcadores');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0007', 'manteles', '5 blancos ');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0008', 'decoraciones', 'cortina de colores, globo y confeti ');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0009', 'utiles', 'lapiceras y papel');
INSERT INTO `recurso` (`id_r`, `nom_r`, `descripcion`) VALUES ('0010', 'bebidas', 'botellas de refresco y/o agua ');

INSERT INTO `contiene` (`id_c`, `cant`, `fk_id_r`, `fk_correo`, `fk_id_auto`, `fk_id_e`) VALUES ('0001', NULL, '0005', 'bfulquere@impulso.edu.uy', '0003', '0022');
INSERT INTO `contiene` (`id_c`, `cant`, `fk_id_r`, `fk_correo`, `fk_id_auto`, `fk_id_e`) VALUES ('0003', '2', '0008', 'fpatritti@impulso.edu.uy', '0004', '0020');
INSERT INTO `contiene` (`id_c`, `cant`, `fk_id_r`, `fk_correo`, `fk_id_auto`, `fk_id_e`) VALUES ('0002', '4', '0006', 'natorres@impulso.edu.uy', '0001', '0003');
INSERT INTO `contiene` (`id_c`, `cant`, `fk_id_r`, `fk_correo`, `fk_id_auto`, `fk_id_e`) VALUES ('0004', '30', '0009', 'natorres@impulso.edu.uy', '0002', '0030');
INSERT INTO `contiene` (`id_c`, `cant`, `fk_id_r`, `fk_correo`, `fk_id_auto`, `fk_id_e`) VALUES ('0005', '50', '0004', 'rlockhart@impulso.edu.uy', '0005', '0019');



