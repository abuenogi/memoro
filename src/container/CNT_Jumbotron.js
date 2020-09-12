import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { usePosition } from '../functions/hooks/usePosition';
import { UserContext } from '../context/UserContext';

import { geo, storage } from '../services/firebase/firebaseConfig';
import { updateDataElement } from '../functions/CRUD';
import usuarioImagen from '../images/person.svg';

import Jumbotron from '../components/Jumbotron';


const Jumbotron_container = () => {



  const { user_auth } = useContext(UserContext);
  console.log('Usuario => user_auth: ', user_auth);

  const { latitude, longitude, error_position } = usePosition();
  const GEOubicacion = new geo.GeoPoint(latitude, longitude)

  
  useEffect(() => {
    const ref_storage = 'usuarios'
    const child_storage = user_auth.id
    let img = document.querySelector('.foto_de_perfil');
    storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url => {
      img.src = url;
    }).catch(function (error) {
      console.log("no se ha podido recuperar la imagen, se añade la ganérica ",error.message);
      img.src = usuarioImagen;
    });

  }, [ user_auth.id])

  useEffect(() => {
  
    if (latitude) {
      let data = { 'ubicacion': GEOubicacion };
      updateDataElement('usuarios', user_auth.id, data);
    }

  }, [ user_auth.id])
  

  return (

    <Jumbotron
    error_position = {error_position}
    nombre_usuario = {user_auth.nombre}
    />
    
  );


}; export default withRouter(Jumbotron_container);