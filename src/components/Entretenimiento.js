import React from "react";
import { withRouter } from 'react-router-dom';
import  Footer from "./Footer";
import { Button, Form } from 'reactstrap';

import NavigationBar from "./NavigationBar";
import Tictactoe from "./Tictactoe";

import Layout from './Layout'


const Entretenimiento = ({ history }) => {

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
            <Footer/>
        </Layout>
    );

}
export default withRouter(Entretenimiento);

