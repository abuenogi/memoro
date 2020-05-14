import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Footer} from "./Footer";
import { Layout} from "./Layout";
import  NavigationBar from "../container/NavigationBar";
import { Jumbotron} from "./Jumbotron";
import { HomeLinks } from "../pages/HomeLinks";

const Home = ()  =>{
 
        return (
            <React.Fragment> 
                <Layout>
                    <NavigationBar/> 
                    <Jumbotron/> 
                    <HomeLinks/>
                </Layout>
                <Footer/>
            </React.Fragment>
        );
    
}


export default withRouter(Home);