import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap';

import calendarioImagen from '../images/calendario.svg';
import mapaImagen from '../images/mapa.svg';
import rompecabezasImagen from '../images/rompecabezas.svg';
import telefonoImagen from '../images/telefono.svg';

import Imagen from './Imagen';

export const HomeLinks = () => (

    <Container>
        <Navbar expand="sl">
            <Nav.Item><Nav.Link href="/calendario"><Imagen src={calendarioImagen} alt="agenda de medicaciones y recordatorios" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/mapa"><Imagen src={mapaImagen} alt="geolocalizacion y posicionamiento en el mapa" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/entretenimiento"><Imagen src={rompecabezasImagen} alt="entretenimiento y juegos" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/contactos"><Imagen src={telefonoImagen} alt="contactos y teléfonos" with="100" height="100"/></Nav.Link></Nav.Item>
        </Navbar>
    </Container>
);


/*

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faPhone, faMap ,faCalendar , faPlay} from "@fortawesome/free-solid-svg-icons";


    <Nav.Item><Nav.Link className='mb-4' href="/calendario"><FontAwesomeIcon icon={(fas, faCalendar)} color="#6c757d" size="8x"  /></Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link  className='mb-4' href="/mapa"><FontAwesomeIcon icon={(fas, faMap)} size="8x" color="#6c757d"  /></Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link href="/entretenimiento"><FontAwesomeIcon icon={(fas, faPlay)} size="8x"color="#6c757d"   /></Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link href="/contactos"><FontAwesomeIcon icon={(fas, faPhone)} size="8x" color="#6c757d"  /></Nav.Link></Nav.Item>

*/