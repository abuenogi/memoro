 
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import { Button} from 'reactstrap';

 
  const BotoneraCreacion = (props) => (

     <Nav className="d-flex justify-content-around mt-4">
         <Nav.Item><Nav.Link href="/home"><Button className="btn btn-block button1">Volver</Button></Nav.Link></Nav.Item>
         <Nav.Item><Nav.Link href="/memorenyosForm"><Button className="btn btn-block button1">Crear</Button></Nav.Link></Nav.Item>
     </Nav>
     

 );export default withRouter(BotoneraCreacion);

