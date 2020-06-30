import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  Footer from "./Footer";
import  Info from "./Info";
import { Layout} from "./Layout";
import  NavigationBar from "../container/CNT_NavigationBar";
import  Jumbotron from "./Jumbotron";
import { HomeLinks } from "../pages/HomeLinks";


const Home = ()  =>{


        return (
            <React.Fragment> 
                <Layout>
                    <NavigationBar/> 
                    <Jumbotron/> 
                    <HomeLinks/>
                <Footer/>
                <Info/>
                </Layout>
            </React.Fragment>
        );
}

export default withRouter(Home);