import React, { Fragment , useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Logo from '../images/logo192.png';

import { Button} from 'reactstrap';



const About = ({ history }) => {


  function onClick() {
    try {
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }

    return (

        <Fragment>
            <h3 className="text-center mb-3">ABOUT</h3>
              <img src={Logo} className="rounded mx-auto d-block  mb-5  mt-3" alt="aligment" />
                <h5 className="text-center"  >
                  v 1.0.t
                </h5>
                <Button type="submit" className="btn-primary btn-block button1 mt-5" onClick={onClick}  >Volver</Button>
        </Fragment>
    );

}
export default withRouter(About);