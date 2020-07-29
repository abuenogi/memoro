import React, { useContext } from "react";

import { UserContext } from '../context/UserContext';
import {auth} from '../services/firebase/firebaseConfig';

import ChangePassword from '../components/ChangePassword';


const ChangePassword_container = ({ history }) => {

    //const user = useContext(UserContext);


    function onClickBotonChangePassword(correo) {

        try {
            
            auth.sendPasswordResetEmail(correo)
            .catch(function (error) {
               console.log(error);
            });
            history.push('/sign-in');

        } catch (error) {
            console.log(error);
        }

    }

    function onClickVolverLogin() {
        try {
          history.push('/sign-in');
        } catch (error) { 
          console.log(error);
        }
    
      }

    return <ChangePassword

        onClickBotonChangePassword={onClickBotonChangePassword}
        onClickVolverLogin = {onClickVolverLogin}
    />


};
export default ChangePassword_container;