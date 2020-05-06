import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`

.navbar{
 background-color:#bbb;
 }
 
 .navbar-brand, .navbar-nav . nav-link {
 color:#f07 ;
    &:hover {
    color:black;
    }
 }
 
 `;
 
 export const NavigationBar = () => (
     <styles>
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
     </styles>
 )
 export default NavigationBar;