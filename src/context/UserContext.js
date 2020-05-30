import { createContext } from 'react';
import { auth} from '../services/firebase/firebaseConfig';


import { getDataElement } from '../fuctions/CRUD';

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
  rol: '',
  ubicacion: ''

};

try {

  auth.onAuthStateChanged(

    async function (user) {

      if (user) {

        user_auth.photoURL = user.photoURL;
        user_auth.user_id = user.uid;
        user_auth.displayName = user.displayName;
        user_auth.email = user.email;

        var user_result = await getDataElement('usuarios', 'email', user.email);

        user_result.forEach(function (doc) {

          user_auth.telefono =  doc.data().telefono;
          user_auth.fechaNac =  doc.data().fechaNac;
          user_auth.pais =  doc.data().pais;
          user_auth.ciudad =  doc.data().ciudad;
          user_auth.domicilio =  doc.data().domicilio;
          user_auth.displayName =  doc.data().nombre;
          user_auth.rol =doc.data().rol;
          user_auth.ubicacion = doc.data().ubicacion;
        
          console.log('Usuario ==> ', user_auth);
        });

        
      } else {
        console.log('No hay usuario logeado');
      }
    });

} catch (error) {
  console.log(error);
}

export const UserContext = createContext(user_auth);


