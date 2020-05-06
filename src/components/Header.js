import React from "react";
import { Link } from "react-router-dom";

import { Nav, Image } from 'react-bootstrap';

// class component
class Header extends React.Component {
  render() {
    return (
        <header>
           <Nav className="justify-content-center" activeKey="/Entretenimiento">
            <Nav.Item>
                <Nav.Link href="/entretenimiento">
                    <Image src="../images/rompecabezas.svg" with="30" height="30" rounded />Entretenimiento
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/mapa">
                    <Image src="../images/mapa.svg" with="30" height="30" rounded />Mapa
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/calendario">
                    <Image src="/images/calendario.svg" with="30" height="30" rounded />Calendario
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/contactos">
                    <Image src="../images/telefono.svg" with="30" height="30" rounded />Contactos
                </Nav.Link>
            </Nav.Item>
        </Nav>            
      </header>
    );
  }
}

export default Header;