import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";

/** USO DE Font Awesome 5 React component using SVG with JS
 * https://www.npmjs.com/package/@fortawesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
 * */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'


//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./index.css";


import Login from "./container/CNT_Login";
import SignUp from "./container/CNT_Signup";
import ChangePassword from "./container/CNT_ChangePassword";
import Home from "./components/Home";
import MemorenyosForm from "./components/MemorenyosForm";
import { HomeLinks } from "./pages/HomeLinks";
import { MiPerfil } from "./pages/MiPerfil";
import  Memorenyos  from "./components/Memorenyos";
import NoMatch  from "./pages/NoMatch";
import { Calendario } from "./pages/Calendario";
import  Mapa  from "./components/Mapa";
import { Entretenimiento } from "./pages/Entretenimiento";
import  Contactos  from "./components/Contactos";

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

              <Route  path="/memorenyosForm" component={MemorenyosForm} />

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