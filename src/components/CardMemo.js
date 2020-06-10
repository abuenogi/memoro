import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

import usuarioImagen from '../images/person.svg';
import Imagen from './Imagen';


const CardMemo = ({memo}) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{memo.nombre}</CardTitle>
                </CardBody>
                <Imagen src={usuarioImagen} alt="Usuario" with="80" height="80" />
                <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardMemo;