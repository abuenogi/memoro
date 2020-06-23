import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Layout } from "./Layout";


// function component
const Info = ({ history }) => {

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
              <p className="text-center" onClick={onClickAbout} >Terminos y condiciones</p>
              <p className="text-center" onClick={onClickAbout} >Conocer más</p>
            </div>

            <div class="col">
              <p className="text-center" onClick={onClickAbout} >Politicas de privacidad</p>
              <p className="text-center" onClick={onClickAbout} >About</p>
            </div>

          </div>

        </div>
      </Fragment>
  

  )

};
export default withRouter(Info);