import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

import usuarioImagen from '../images/person.svg';
import Imagen from './Imagen';


const CardMemo = ({ memo, telefono }) => {
    
    var text = ''
    if (telefono){
    var text = telefono
    }
    
    return (
        <div className='CardMemo'>
            
                    <h2 className="m-3">{memo}</h2>
              
                <Imagen className="d-flex justify-content-around" src={usuarioImagen} alt="Usuario" with="200" height="200" />
               <h3 className="m-3">{text}</h3>
              
        </div>
    );
};

export default CardMemo;