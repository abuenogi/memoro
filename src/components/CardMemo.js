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
    var text = 'Teléfono: ' + telefono
    }
    
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{memo}</CardTitle>
                </CardBody>
                <Imagen src={usuarioImagen} alt="Usuario" with="80" height="80" />
                <CardBody>
                    <CardText>{text}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardMemo;