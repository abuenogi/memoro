import React from 'react';
import usuarioImagen from '../images/person.svg';

import Imagen from './Imagen';


const CardMemo = ({ memo, telefono }) => {
    
    var text = ''
    if (telefono){
     text = telefono
    }
<<<<<<< HEAD
=======

>>>>>>> bff08ca2c84bb2799ea87f8872ab765f27244b4e
    
    return (
        <div className='CardMemo'>
            
                    <h2 className="m-3">{memo}</h2>
              
                <Imagen className="d-flex justify-content-around" src={usuarioImagen} alt="Usuario" with="200" height="200" />
               <h3 className="m-3">{telefono}</h3>
              
        </div>
    );
};

export default CardMemo;