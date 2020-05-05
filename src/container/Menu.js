import React, { useContext } from "react";

import { UserContext } from '../context/UserContext';
import { auth } from '../services/firebase/firebaseConfig';

import Menu from '../components/Menu';


const Menu_container = ({history}) => {

 

  function onClickBotonSignOut() {

    try {

      auth.signOut()
      .catch(function (error) {
        console.log(error);
      });

      history.push('/sign-in');

    } catch (error) {
      console.log(error);
    }

  }

  return <Menu
    onClickBotonSignOut={onClickBotonSignOut}
   
   
   
  />


};
export default Menu_container;