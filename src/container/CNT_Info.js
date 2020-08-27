
import React  from 'react';
import { withRouter } from 'react-router-dom';

import Info from '../components/Info';

// function component
const Info_container = ({ history }) => {


  function onClickTerYCon() {
    try {
      history.push('/terminos');
    } catch (error) {
      console.log(error);
    }
  }


  function onClickPrivacidad() {
    try {
      history.push('/Privaciadad');
    } catch (error) {
      console.log(error);
    }
  }

  function onClickAbout() {
    try {
      history.push('/about');
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <Info
    
    onClickTerYCon = {onClickTerYCon}
    onClickPrivacidad = {onClickPrivacidad}
    onClickAbout = {onClickAbout}

    />


  )

};
export default withRouter(Info_container);