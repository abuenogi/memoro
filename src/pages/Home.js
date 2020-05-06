import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap';
import Imagen from '../components/Imagen';
import calendarioImagen from '../images/calendario.svg';
import mapaImagen from '../images/mapa.svg';
import rompecabezasImagen from '../images/rompecabezas.svg';
import telefonoImagen from '../images/telefono.svg';

export const Home = () => (

    <Container>
        <Navbar expand="lg">
            <Nav.Item><Nav.Link href="/calendario"><Imagen src={calendarioImagen} alt="agenda de medicaciones y recordatorios" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/mapa"><Imagen src={mapaImagen} alt="geolocalizacion y posicionamiento en el mapa" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/entretenimiento"><Imagen src={rompecabezasImagen} alt="entretenimiento y juegos" with="100" height="100" /></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/contactos"><Imagen src={telefonoImagen} alt="contactos y teléfonos" with="105" height="105"/></Nav.Link></Nav.Item>
        </Navbar>
    </Container>
);