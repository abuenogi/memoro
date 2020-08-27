import React, { useContext } from "react";
import { withRouter } from 'react-router-dom';
import produce from 'immer';

import { UserContext } from '../context/UserContext';
import { auth } from '../services/firebase/firebaseConfig';

import NavigationBar from '../components/NavigationBar';


const NavigationBar_container = ({ history }) => {

   
    const {user_context, setUserAuth} = useContext(UserContext);

    async function cerrarSesion() {

        try {

                auth.signOut()
                    .then(function () {
                        history.push('/');
                        /*
                        const updateUser = async user => {

                            setUserAuth(await produce(user_context, async (draft) => {
                    
                                if (user) {
                                
                                  //draft.isLogin = user.isLogin= false;
                                  
                                  return draft;
                        
                                } else {
                                  console.log('Error setUserAuth');
                                }
                        
                              }))
                                //función de immer que se encarga de hacer el objeto inmutable
                                ;
                            }   
                        const unsuscribe = auth.onAuthStateChanged(updateUser);
                        return () => unsuscribe();
                        */
                        
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