import React, { useContext } from "react";

import { auth } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';

import Login from '../components/Login';

const Login_container = ({ history }) => {

  const user_context = useContext(UserContext);

  debugger;
  function onClickBotonLogin(correo, pass) {
    debugger;
    try {

      auth.signInWithEmailAndPassword(correo, pass)
        .catch(function (error) {
          debugger;
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
      
      debugger;
      history.push('/menu');

    } catch (error) {
      debugger;
      console.log(error);
    }

  }

  function onLoadUser() {

    if (!user_context) {
      history.push('/menu');
    }
  }

  function onClickChangePass() {
    try {
      history.push('/change-password');
    } catch (error) {
      console.log(error);
    }

  }

  debugger;
  function onClickReg() {
    debugger;
    try {
      debugger;
      history.push('/sign-up');
    } catch (error) {
      debugger;
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