import React  from 'react';
import { withRouter } from 'react-router-dom';
import { Jumbotron as Jumbo } from 'react-bootstrap';
import FatalError from './NoMatch';


import Imagen from './Imagen';



const Jumbotron = ({error_position, nombre_usuario}) => {


  if (error_position)
    return <FatalError />

  return (


      <Jumbo fluid className="jumbo">
        <div className="overlay">
          <div className="cntNombre"> <h2>Hola</h2><p>{nombre_usuario}</p></div>
          <div className="cntImg"> <Imagen  alt="Usuario" with="80" height="80" /></div>
        </div>
      </Jumbo>
    
  );


}; export default withRouter(Jumbotron);