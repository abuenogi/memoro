import React, { Component } from 'react';
import { Footer} from "./Footer";
import { Layout} from "./Layout";
import { NavigationBar} from "./NavigationBar";
import { Jumbotron} from "./Jumbotron";
import { Home} from "../pages/Home";

class App extends Component {
    render(){
        return (
            <React.Fragment> 
                <Layout>
                    <NavigationBar/> 
                    <Jumbotron/> 
                    <Home/>
                </Layout>
                <Footer/>
            </React.Fragment>
        );
    }
}


export default App;