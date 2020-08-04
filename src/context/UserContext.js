import { createContext } from 'react';



export const user_auth = {

  photoURL: '',
  id: '',
  nombre: '',
  email: '',
  telefono: '',
  fechaNac: '',
  pais: '',
  ciudad: '',
  domicilio: '',
  rol: '',
  ubicacion: '',
  contactos: '',
  cuidador: '',
  casa: '',
  radioSeguridad : '',
  eventos:'',
  isLogin: false

};

//Valores por defecto del memoreño seleccionado, la primera vez que entra en la aplicación no tiene valores.
export const memoSelected = {
  ciudad: '',
  contactos: '',
  correo: '',
  cuidador: '',
  casa:'',
  id:'',
  imagen:'',
  nombre:'',
  pais:'',
  radioSeguridad:'',
  rol: '',
  telefono:'',
  ubicacion: '' 

};

//Creo el contexto con los valores del usuario autenticado y el memoreño seleccionado.
export const UserContext = createContext({user_auth, memoSelected});
