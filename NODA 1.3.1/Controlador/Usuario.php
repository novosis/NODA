<?php
class usuario{
    private $nombre;
    private $apellido;
    private $correo;
    private $contracena;

    public function __construct($nombre, $apellido, $correo, $contracena){
        $this->Nombre = $Nombre;
        $this->Apellido = $Apellido;
        $this->Correo = $Correo;
        $this->Contracena = $Contracena;
    }

    public function getNombre(){
        return $this->Nombre;
    }

    public function getApellido(){
        return $this->Apellido;
    }
    public function getCorreo(){
        return $this->Correo;
    }
    public function getContracena(){
        return $this->Contracena;
    }

    public function setNombre($Nombre){
        $this->Nombre = $Nombre;
    }

    public function setApellido($Apellido){
        $this->Apellido = $Apellido;
    }

    public function setCorreo($Correo){
        $this->Correo = $Correo;
    }

    public function setContracena($Contracena){
        $this->Contracena = $Contracena;
    }
?>