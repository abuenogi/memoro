import React from "react";
import {useDispatch} from 'react-redux'

import { withRouter } from 'react-router-dom';

import allActions from '../actions'
import { auth } from '../services/firebase/firebaseConfig';

import NavigationBar from '../components/NavigationBar';


const NavigationBar_container = ({ history }) => {

  
    const dispatch = useDispatch()

    async function cerrarSesion() {

        try {

                auth.signOut()
                    .then(function () {
                    
                        dispatch(allActions.userActions.logOut())
                        history.push('/');
                        
                    })
                    .catch(function (error) {
                        var errorCode = error.code, errorMessage = error.message;
                        console.log(errorCode + " " + errorMessage);
                    })

        } catch (error) {
            console.log(error);
        }

    }



    return <NavigationBar

        cerrarSesion={cerrarSesion}

    />


};
export default withRouter(NavigationBar_container);