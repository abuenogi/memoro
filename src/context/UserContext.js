import { createContext } from 'react';


/*
export function status_Sesion(boolean_value) {
  
  if(boolean_value){
     user_auth.isLogin=true;
  }else if (!boolean_value){
    user_auth.isLogin=false;
  }
  return user_auth.isLogin;

}
*/

export const user_auth = {

  id: '',
  nombre: '',
  email: '',
  telefono: '',
  fechaNac: '',
  rol: '',
  ubicacion: '',
  contactos: '',
  cuidador: '',
  casa: '',
  radioSeguridad : '',
  eventos:''
 

};

//Valores por defecto del memoreño seleccionado, la primera vez que entra en la aplicación no tiene valores.
export const memoSelected = {
  
  contactos: '',
  email: '',
  cuidador: '',
  casa:'',
  id:'',
  nombre:'',
  radioSeguridad:'',
  rol: '',
  telefono:'',
  ubicacion: '' 

};

//Creo el contexto con los valores del usuario autenticado y el memoreño seleccionado.
export const UserContext = createContext({user_auth, memoSelected});
