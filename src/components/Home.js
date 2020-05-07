import React, { Component } from 'react';
import { Footer} from "./Footer";
import { Layout} from "./Layout";
import { NavigationBar} from "./NavigationBar";
import { Jumbotron} from "./Jumbotron";
import { HomeLinks } from "../pages/HomeLinks";

class Home extends Component {
    render(){
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
}


export default Home;