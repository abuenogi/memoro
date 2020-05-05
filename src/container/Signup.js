import React, { useContext } from "react";

import { auth } from '../services/firebase/firebaseConfig';

import {createData} from '../fuctions/CRUD';

import Signup from '../components/Signup';



const Signup_container = ({ history }) => {

  
  debugger;

  function onClickBotonCreateUser(nombre, correo, contraseya, telefono, domicilio, ciudad, pais) {

    debugger;

    try {

      auth.createUserWithEmailAndPassword(correo, contraseya)
      .catch(function (error) {
          debugger;
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });

      loggerUser(nombre, correo, telefono, domicilio, ciudad, pais);
      history.push('/menu');

    } catch (error) {
      debugger;
      console.log(error);
    }

  }


  const loggerUser = ( nombre, correo, telefono, domicilio, ciudad, pais) => {

    var obj_user = {

      "nombre": nombre,
      "correo": correo,
      "telefono": telefono,
      "domicilio": domicilio,
      "ciudad": ciudad,
      "pais": pais,
      "rol": "cuidador"
    }

    debugger;
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