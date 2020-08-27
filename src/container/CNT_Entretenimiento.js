import React from "react";
import { withRouter } from 'react-router-dom';

import Entretenimiento from '../components/Entretenimiento';


const Entretenimiento_container = ({ history }) => {

    function onClickVolver() {
        try {
            history.push('/home');
        } catch (error) {
            console.log(error);
        }

    }

    return (
   
        <Entretenimiento
        onClickVolver= {onClickVolver}
        />

    );

}
export default withRouter(Entretenimiento_container);
