import React, { useContext } from "react";
import { withRouter } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { auth } from '../services/firebase/firebaseConfig';

import NavigationBar from '../components/NavigationBar';


const NavigationBar_container = ({ history }) => {

    // const {UserContext , closeSesion } = useContext(UserContext);


    function cerrarSesion() {

        try {

            if (window.confirm("¿Deseas cerrar sesión?")) {

                auth.signOut()
                    .then(function () {
                        debugger;
                        history.push('/sign-in');
                    })
                    .catch(function (error) {
                        debugger;
                        var errorCode = error.code, errorMessage = error.message;
                        console.log(errorCode + " " + errorMessage);
                    })

            } else {

            }

        } catch (error) {
            console.log(error);
        }

    }



    return <NavigationBar

        cerrarSesion={cerrarSesion}

    />


};
export default withRouter(NavigationBar_container);