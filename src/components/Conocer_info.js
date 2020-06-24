import React, { Fragment , useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Logo from '../images/logo192.png';

import { Button,} from 'reactstrap';



const Conocer = ({ history }) => {


  function onClick() {
    try {
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }

    return (

        <Fragment>
             
                <h3 className="text-center"  >CONOCER MÁS</h3>
                <Button type="submit" className="btn-primary btn-block button1 mt-5" onClick={onClick}  >Volver</Button>
        </Fragment>
    );

}
export default withRouter(Conocer);