import React from 'react';
import {Nav, Navbar, Button} from 'react-bootstrap';

 
 export const BotoneraCreacion = (props) => (

     <Nav className="justify-content-center">
         <Nav.Item><Nav.Link href="/home"><Button variant="primary" size="lg">Volver</Button></Nav.Link></Nav.Item>
         <Nav.Item><Nav.Link href="/memorenyosForm"><Button variant="primary" size="lg">Crear</Button></Nav.Link></Nav.Item>
     </Nav>
     

 )