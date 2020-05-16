import React, { useContext, useEffect } from "react";

import { auth } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';

import Login from '../components/Login';

const Login_container = ({ history }) => {

  const user_context = useContext(UserContext);


  useEffect(() => {
    
    /*
    if (user_context) {
      history.push('/home');
    }
    */
  },
    [user_context]
  )



  function onClickBotonLogin(credeciales) {

    try {

      auth.signInWithEmailAndPassword(credeciales.email, credeciales.password)
        .then(function () {
          history.push('/home');
        })
        .catch(function (error) {
          history.push('/');
          var errorCode = error.code, errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          if (error.code === 'auth/user-not-found') {
            window.alert('Este usuario no existe');
          }
        });


    } catch (error) {
      console.log(error);
    }

  }


  function onClickChangePass() {
    try {
      history.push('/change-password');
    } catch (error) {
      console.log(error);
    }

  }


  function onClickReg() {
    try {
      history.push('/sign-up');
    } catch (error) {
      console.log(error);
    }

  }


  return <Login
    onClickBotonLogin={onClickBotonLogin}
    onClickChangePass={onClickChangePass}
    onClickReg={onClickReg}

  />

};
export default (Login_container);