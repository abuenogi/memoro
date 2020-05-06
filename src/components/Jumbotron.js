import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from '../images/calendario.svg';
import usuarioImagen from '../images/person.svg';
import Imagen from './Imagen';



const Styles = styled.div`
  .jumbo {
    /**background: url(${boatImage}) no-repeat fixed bottom;*/
    background: linear-gradient(90deg, rgb(111, 112, 190) 0%, #5082c4 100%);
    background-size: cover;
    color: #efefef;
    height: 175px;
    position: relative;
    z-index: -2;
    width: 100%; 
  }
  .overlay {
    background-color: #083b66;
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    width: 100%; 
  }
  .cntNombre {
    display: inline-block;
    width: 50%;
    text-align: left;
    padding: 15px;
    vertical-align: bottom;
  }
  .cntImg {
    display: inline-block;
    width: 50%;
    text-align: right;
    padding: 15px;
    vertical-align: bottom;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay">
        <div className="cntNombre"> <h2>Bienvenido</h2><p>Pepito de los Palotes</p></div>
        <div className="cntImg"> <Imagen src={usuarioImagen} alt="Usuario" with="100" height="140" /></div>
    </div>
    </Jumbo>
  </Styles>
)