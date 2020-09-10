import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';


// function component
const Info = ({onClickTerYCon,onClickPrivacidad,onClickAbout}) => {


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