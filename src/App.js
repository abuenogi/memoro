import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from "./pages/Home";
import { MiPerfil } from "./pages/MiPerfil";
import { Memorenyos } from "./pages/Memorenyos";
import { Desconectar } from "./pages/Desconectar";
import { NoMatch } from "./pages/NoMatch";
import { Calendario } from "./pages/Calendario";
import { Mapa } from "./pages/Mapa";
import { Entretenimiento } from "./pages/Entretenimiento";
import { Contactos } from "./pages/Contactos";

import { Footer} from "./components/Footer";
import { Layout} from "./components/Layout";
import { NavigationBar} from "./components/NavigationBar";
import { Jumbotron} from "./components/Jumbotron";

class App extends Component {
    render(){
        return (
            <React.Fragment>
           
            <Layout>
            <NavigationBar/> 
            <Jumbotron/>
             <Router>
                    <Switch>
                        /** PATHS de las páginas del menú superior derecho - barra de navegación*/
                        <Route exact path="/" component={Home} />
                        <Route  path="/miperfil" component={MiPerfil} />
                        <Route  path="/memorenyos" component={Memorenyos} />
                        <Route  path="/desconectar" component={Desconectar} />
                        /** PATHS de las páginas del menú del Home */
                        <Route  path="/calendario" component={Calendario} />
                        <Route  path="/mapa" component={Mapa} />
                        <Route  path="/entretenimiento" component={Entretenimiento} />
                        <Route  path="/contactos" component={Contactos} />
                        <Route component={NoMatch}/>
                    </Switch>
                 </Router>
            </Layout>
            <Footer/>
            </React.Fragment>
        );
    }
}


export default App;