import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Jumbotron as Jumbo } from 'react-bootstrap';
import FatalError from './NoMatch';
import boatImage from '../images/calendario.svg';

import Imagen from './Imagen';
import { usePosition } from '../functions/hooks/usePosition';
import { UserContext } from '../context/UserContext';

import { geo, storage } from '../services/firebase/firebaseConfig';
import { updateDataElement } from '../functions/CRUD';

import styled from 'styled-components';


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

  }, [ user_auth.id])

  useEffect(() => {
  
    if (latitude) {
      let data = { 'ubicacion': GEOubicacion };
      updateDataElement('usuarios', user_auth.id, data);
    }

  }, [ user_auth.id])
  

  if (error_position)
    return <FatalError />

  return (


      <Jumbo fluid className="jumbo">
        <div className="overlay">
          <div className="cntNombre"> <h2>Hola</h2><p>{user_auth.nombre}</p></div>
          <div className="cntImg"> <Imagen  alt="Usuario" with="80" height="80" /></div>
        </div>
      </Jumbo>
    
  );


}; export default withRouter(Jumbotron);