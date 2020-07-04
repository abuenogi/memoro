import React from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'reactstrap';

import NavigationBar from "../../NavigationBar";
import Tictactoe from "./Tictactoe";

import Layout from '../../Layout'




const pantalla_tictactoe = ({ history }) => {

    function onClickVolver() {
        try {
            history.push('/home');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Layout >

            <NavigationBar />
            <Tictactoe />
            <Button type="submit" className="btn btn-primary btn-block mt-5 button1" onClick={onClickVolver}> Volver </Button>
            
        </Layout>
    );

}
export default withRouter(pantalla_tictactoe);

