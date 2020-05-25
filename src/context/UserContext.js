import { createContext } from 'react';
import { auth } from '../services/firebase/firebaseConfig';
import { getDataElement, getData } from '../fuctions/CRUD';

export var user_auth = {

  photoURL: '',
  user_id: '',
  displayName: '',
  email: '',
  telefono: '',
  fechaNac: '',
  pais: '',
  ciudad: '',
  domicilio: '',
  rol: ''

};

export const memoSelected = {
  photoURL: '',
  user_id: '',
  displayName: '',
  email: '',
  telefono: '',
  fechaNac: '',
  pais: '',
  ciudad: '',
  domicilio: '',
  rol: '',
  contactos: ''
};

try {
  auth.onAuthStateChanged(

    async function (user) {

      //console.log("usuario-> " + user.uid);

      if (user) {

        user_auth.photoURL = user.photoURL;
        user_auth.user_id = user.uid;
        user_auth.displayName = user.displayName;
        user_auth.email = user.email;

        var user_result = await getDataElement('usuarios', 'email', user.email);

        user_result.forEach(function (doc) {
          doc.data(); //is never undefined for query doc snapshots
          console.log('Usuario => ' + doc.data().nombre);

          user_auth.telefono =  doc.data().telefono;
          user_auth.fechaNac =  doc.data().fechaNac;
          user_auth.pais =  doc.data().pais;
          user_auth.ciudad =  doc.data().ciudad;
          user_auth.domicilio =  doc.data().domicilio;
          user_auth.displayName =  doc.data().nombre;
        });

        user_auth.rol = 'cuidador';
      } else {
        console.log('El usuario no existe');
      }
    });

} catch (error) {
  console.log(error);
}

export const UserContext = createContext(user_auth);


