import React, { Component  } from 'react';

{/*Componente para renderizar imágenes de forma dinámica*/}

export const Imagen = (props) => (
  <img src={props.src} height={props.height} width={props.width} alt={props.alt}/>
);

export default Imagen;