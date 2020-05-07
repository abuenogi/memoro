import { createContext } from 'react';

import { auth } from '../services/firebase/firebaseConfig';



export var user_auth = {
  
  user_id: '',
  displayName : '',
  email : '',
  estado: '' ,
  photoURL: '',
  rol: ''
};


auth.onAuthStateChanged(
  
  function (user) {

    console.log("usuario-> " + user.uid);

  if (user) {
    user_auth.user_id = user.uid;
    user_auth.displayName = user.displayName;
    user_auth.email = user.email;
    user_auth.photoURL = user.photoURL;
  }
});


export const UserContext = createContext(user_auth);


