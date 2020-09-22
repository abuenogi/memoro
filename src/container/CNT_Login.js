import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import Login from '../components/Login';
import { auth } from '../services/firebase/firebaseConfig';
import allActions from '../actions'
import { UserContext } from '../context/UserContext';

const Login_container = ({ history }) => {

 
  const currentUser = useSelector(store => store.currentUser)
  const { user_auth } = useContext(UserContext);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("CNT_Login user_auth: [", user_auth.id, "] currentUser.loggedIn: ",currentUser.loggedIn)
    if (currentUser.loggedIn) {
   // if (user_auth.id!=='') {
     history.push('/home')
    }
  },
    [currentUser]
  )


  function onClickBotonLogin(credeciales) {

    try {

      auth.signInWithEmailAndPassword(credeciales.email, credeciales.password)
        .then(function () {
         
          dispatch(allActions.userActions.setUser(credeciales))
          history.push('/home')

        })
        .catch(function (error) {
          history.push('/');
          var errorCode = error.code, errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          if (error.code === 'auth/user-not-found') {

            confirmAlert({
              title: 'Usuario incorrecto',
              message: 'Compruebe sus credenciales, si no tiene usuario puede crearlo.',

              buttons: [
                {
                  label: 'Vale',

                }
              ]
            });
          } else if (error.code === 'auth/wrong-password') {

            confirmAlert({
              title: 'Contraseña incorrecta',
              message: 'Puede intentarlo de nuevo.',

              buttons: [
                {
                  label: 'Vale',

                }
              ]
            });
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