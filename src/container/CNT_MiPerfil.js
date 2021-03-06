import React, { useContext } from "react";
import { auth, geo } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';
import MiPerfil from '../components/MiPerfil';
import { deleteData, updateDataElement} from '../functions/CRUD';

const MiPerfil_container = ({ history }) => {

  const { user_auth } = useContext(UserContext);

  function onClickSave(nombre, email, password, telefono, fechaNac, ubicacion) {

    try {
      cambiarDatosUsuario(nombre, email, telefono, fechaNac, ubicacion);

      if(password!=='******'){
        cambiarPassword(password);
      }
      history.push('/home');

    } catch (error) {
      console.log(error);
    }

  }

  const cambiarCorreo = (email) => {

    var user = auth.currentUser;

    user.updateEmail(email).then(function () {
      // Update successful.
      /*
      user.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        // An error happened.
      });*/
    }).catch(function (error) {
      console.log(error)
    });

  }

  const cambiarPassword = (password) => {

    var user = auth.currentUser;
    //var newPassword = getASecureRandomPassword();

    user.updatePassword(password).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });

  }


  const cambiarDatosUsuario = (nombre, email, telefono, fechaNac, ubicacion) => {


    const GEOubicacion = new geo.GeoPoint(ubicacion.casa.latitude, ubicacion.casa.longitude)

    let data = {
      'nombre': nombre,
      'email': email,
      'telefono': telefono,
      'fechaNac': fechaNac,
      'casa': GEOubicacion
    };
    updateDataElement('usuarios', user_auth.id, data);
    
    cambiarCorreo(email);
  }



  function onClickVolver() {
    try {
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }

  function onClickBorrarUsuario() {

    try {

      deleteData(user_auth.id, 'usuarios');

      var user = auth.currentUser;

      user.delete().then(function () {
        history.push('/');
      }).catch(function (error) {
        // An error happened.
      });

    } catch (error) {
      console.log(error);
    }

  }

  return <MiPerfil
    onClickSave={onClickSave}
    onClickVolver={onClickVolver}
    onClickBorrarUsuario={onClickBorrarUsuario}

  />


};
export default MiPerfil_container;