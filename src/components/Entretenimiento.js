import React from "react";
import { withRouter } from 'react-router-dom';
import  Footer from "./Footer";
import { Button } from 'reactstrap';

import NavigationBar from "./NavigationBar";
import Tictactoe from "./Tictactoe";

import Layout from './Layout'


const Entretenimiento = ({ onClickVolver }) => {

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

