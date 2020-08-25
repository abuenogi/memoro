import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Layout } from "./Layout";


// function component
const Info = ({ history }) => {


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

    <Fragment>
      <div class="caja_footer row  pt-3">
        <p className="text-center col p-0 ml-2" onClick={onClickTerYCon} >Terminos y condiciones</p>
        <p className="text-center col p-0 m-0" onClick={onClickAbout} >About</p>
        <p className="text-center col p-0 mr-2" onClick={onClickPrivacidad} >Politicas de privacidad</p>
      </div>
    </Fragment>


  )

};
export default withRouter(Info);