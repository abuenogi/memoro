import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./index.css";


import Login from "./container/Login";
import SignUp from "./container/Signup";
import ChangePassword from "./container/ChangePassword";
import Home from "./components/Home";
import { HomeLinks } from "./pages/HomeLinks";
import { MiPerfil } from "./pages/MiPerfil";
import Memorenyos from "./components/Memorenyos";
import { MemorenyosForm } from "./components/MemorenyosForm";
import { NoMatch } from "./pages/NoMatch";
import { Calendario } from "./pages/Calendario";
import  Mapa  from "./components/Mapa";
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
              <Route exact path="/home" component={Home} />

              /** PATHS de las páginas del menú superior derecho - barra de navegación*/
              <Route  path="/homelinks" component={HomeLinks} />
              <Route  path="/miperfil" component={MiPerfil} />
              <Route  path="/memorenyos" component={Memorenyos} />

              /** PATHS formularios */
              <Route  path="/memorenyosForm" component={MemorenyosForm}/>

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