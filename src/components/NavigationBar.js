import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

 export const NavigationBar = () => (

         <Navbar expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src="/logo192.png"
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="Logo de Memoro"
                />
            </Navbar.Brand>
             <Navbar.Toggle aria-controls="basic-navbar-nav"/> 
             <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/miperfil">Mi perfil</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/memorenyos">Memoreños</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/desconectar">Desconectar</Nav.Link></Nav.Item>
                </Nav>
             </Navbar.Collapse>
         </Navbar>
 )
 export default NavigationBar;