import { createContext } from 'react';
import { auth } from '../services/firebase/firebaseConfig';
import { usePosition } from '../fuctions/usePosition';
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
  rol: '',
  location: ''

};

//Valores por defecto del memoreño seleccionado, la primera vez que entra en la aplicación no tiene valores.
export const memoSelected = {
  ciudad: '',
  contactos: '',
  correo: '',
  cuidador: '',
  direccion:'',
  id:'',
  imagen:'',
  nombre:'',
  pais:'',
  radioSeguridad:'',
  rol: '',
  telefono:'',
  ubicacion: '' 
};

try {

  const { latitude, longitude, error_position } = usePosition();

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
          console.log('Usuario => ', doc.data());
          user_auth.telefono =  doc.data().telefono;
          user_auth.fechaNac =  doc.data().fechaNac;
          user_auth.pais =  doc.data().pais;
          user_auth.ciudad =  doc.data().ciudad;
          user_auth.domicilio =  doc.data().domicilio;
          user_auth.displayName =  doc.data().nombre;
          user_auth.longitude = [latitude, longitude]
        });

        user_auth.rol = 'cuidador';
      } else {
        console.log('El usuario no existe');
      }
    });

} catch (error) {
  console.log(error);
}

//Creo el contexto con los valores del usuario autenticado y el memoreño seleccionado.
export const UserContext = createContext(user_auth);


