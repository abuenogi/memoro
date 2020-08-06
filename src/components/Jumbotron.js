import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import FatalError from '../pages/NoMatch';
import { geo } from '../services/firebase/firebaseConfig';
import { updateDataElement } from '../fuctions/CRUD';
import { func_getDownloadURL } from '../fuctions/CRUD_img';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from '../images/calendario.svg';
import usuarioImagen from '../images/person.svg';
import Imagen from './Imagen';
import { usePosition } from '../fuctions/usePosition';
import { UserContext } from '../context/UserContext';
import {
  storage
} from '../services/firebase/firebaseConfig.js';



const Styles = styled.div`
  .jumbo {
    /**background: url(${boatImage}) no-repeat fixed bottom;*/
    /**background: linear-gradient(90deg, rgb(111, 112, 190) 0%, #5082c4 100%);*/
    background-size: cover;
    color: #efefef;
    /**height: 200px;*/
    /**position: relative;*/
    /*z-index: -2;*/
    padding: 0;
  }
  .overlay {
    background-color: #083b66;
    opacity: 0.9;
    /**position: absolute;*/
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    width: 100%; 
    border-radius: 5px;
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

const Jumbotron = () => {



  const { user_auth } = useContext(UserContext);
  console.log('Usuario => user_auth: ', user_auth);

  const { latitude, longitude, error_position } = usePosition();
  const GEOubicacion = new geo.GeoPoint(latitude, longitude)

  
  useEffect(() => {
    const ref_storage = 'usuarios'
    const child_storage = user_auth.id
    storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url => {
      // `url` is the download URL for 'images/stars.jpg'
      var img = document.querySelector('.foto_de_perfil');
      img.src = url;

    }).catch(function (error) {
      console.log(error)
    });


    if (latitude) {
      let data = { 'ubicacion': GEOubicacion };
      updateDataElement('usuarios', user_auth.id, data);
    }

  }, [latitude, longitude, user_auth])

  if (error_position)
    return <FatalError />

  return (

//src={usuarioImagen} 

    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay">
          <div className="cntNombre"> <h2>Hola</h2><p>{user_auth.nombre}</p></div>
          <div className="cntImg"> <Imagen  alt="Usuario" with="80" height="80" /></div>
        </div>
      </Jumbo>
    </Styles>
  );


}; export default withRouter(Jumbotron);