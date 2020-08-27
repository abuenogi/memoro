import React from 'react';

/*Componente para renderizar imágenes de forma dinámica*/

 const Imagen = (props) => (
  <img className='foto_de_perfil' src={props.src} height={props.height} width={props.width} alt={props.alt}/>
);

export default Imagen;