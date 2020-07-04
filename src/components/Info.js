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
  function onClickConoceMas() {
    try {
      history.push('/ConocerMas');
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
   
        <div class="caja_footer pt-3">

          <div class="row">

            <div class="col" expand="lg">
              <p className="text-center" onClick={onClickTerYCon} >Terminos y condiciones</p>
              <p className="text-center" onClick={onClickConoceMas} >Conocer más</p>
            </div>

            <div class="col">
              <p className="text-center" onClick={onClickPrivacidad} >Politicas de privacidad</p>
              <p className="text-center" onClick={onClickAbout} >About</p>
            </div>

          </div>

        </div>
      </Fragment>
  

  )

};
export default withRouter(Info);