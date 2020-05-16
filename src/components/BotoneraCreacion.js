  
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Nav, Navbar, Button} from 'react-bootstrap';

 
  const BotoneraCreacion = (props) => (

     <Nav className="justify-content-center">
         <Nav.Item><Nav.Link href="/home"><Button variant="primary" size="lg">Volver</Button></Nav.Link></Nav.Item>
         <Nav.Item><Nav.Link href="/memorenyosForm"><Button variant="primary" size="lg">Crear</Button></Nav.Link></Nav.Item>
     </Nav>
     

 );export default withRouter(BotoneraCreacion);