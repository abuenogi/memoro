import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./index.css";


import Login from "./container/Login";
import SignUp from "./container/Signup";
import ChangePassword from "./container/ChangePassword";
import App from "./components/App";
import { Home } from "./pages/Home";
import { MiPerfil } from "./pages/MiPerfil";
import { Memorenyos } from "./pages/Memorenyos";
import { Desconectar } from "./pages/Desconectar";
import { NoMatch } from "./pages/NoMatch";
import { Calendario } from "./pages/Calendario";
import { Mapa } from "./pages/Mapa";
import { Entretenimiento } from "./pages/Entretenimiento";
import { Contactos } from "./pages/Contactos";

import { user_auth, UserContext } from './context/UserContext';



ReactDOM.render((
  
<BrowserRouter >
        <UserContext.Provider value={user_auth}>
          <div className="auth-inner">
            <Switch>

              /** PATHS de las páginas del inicio de sesion/registro*/
              <Route exact path='/' component={Login} />
              <Route exact path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/change-password" component={ChangePassword} />
              <Route exact path="/app" component={App} />

              /** PATHS de las páginas del menú superior derecho - barra de navegación*/
              <Route  path="/home" component={Home} />
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
          </div>
        </UserContext.Provider>
      </BrowserRouter>),
  document.getElementById('root') 
);


serviceWorker.register();