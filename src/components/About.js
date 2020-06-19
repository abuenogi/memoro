import React, { Fragment , useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Logo from '../images/logo192.png';

import { Button,} from 'reactstrap';



const About = ({ history }) => {


    
  function onClickChangePass() {
    try {
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }

   
    return (

        <Fragment>
              <img src={Logo} className="rounded mx-auto d-block  mb-5  mt-3" alt="aligment" />
                <h3 className="text-center"  >
                  v 1.0.t
                </h3>
                <Button type="submit" className="btn-primary btn-block button1 mt-5" onClick={onClickChangePass}  >Volver</Button>
        </Fragment>
    );

}
export default withRouter(About);