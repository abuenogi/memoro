import React, { useContext } from "react";

import { auth, db, geo } from '../services/firebase/firebaseConfig';


import { createData } from '../fuctions/CRUD';

import Signup from '../components/Signup';



const Signup_container = ({ history }) => {



  function onClickBotonCreateUser(nombre, email, password, telefono, fechaNac, lat, lon) {

    try {

      auth.createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          alert('El usuario no se ha podido crear');
        });
        
        loggerUser(nombre, email, telefono, fechaNac, lat, lon);
        history.push('/sign-in');

     
    } catch (error) {
      console.log(error);
    }

  }


  const loggerUser = (nombre, email, telefono, fechaNac, lat, lon ) => {

    var obj_user = {
      
      "nombre": nombre,
      "email": email,
      "telefono": telefono,
      "fechaNac": fechaNac,
      "rol": "cuidador",
      "ubicacion": new geo.GeoPoint(1,1),
      "casa": new geo.GeoPoint(lat, lon)
   
    }

    createData(obj_user, 'usuarios');
  }



  function onClickVolver() {
    try {
      history.push('/sign-in');
    } catch (error) {
      console.log(error);
    }

  }


  return <Signup
    onClickBotonCreateUser={onClickBotonCreateUser}
    onClickVolver={onClickVolver}

  />


};
export default Signup_container;