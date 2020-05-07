import React, { useContext } from "react";

import { auth } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';

import Login from '../components/Login';

const Login_container = ({ history }) => {

  const user_context = useContext(UserContext);


  function onClickBotonLogin(correo, pass) {
    
    try {

      auth.signInWithEmailAndPassword(correo, pass)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });

      history.push('/home');

    } catch (error) {
      console.log(error);
    }

  }

  function onLoadUser() {

    if (!user_context) {
      history.push('/home');
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
    onLoadUser={onLoadUser}
    onClickChangePass={onClickChangePass}
    onClickReg={onClickReg}

  />

};
export default (Login_container);