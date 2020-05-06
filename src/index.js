import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./index.css";


import Login from "./container/Login";
import SignUp from "./container/Signup";
import ChangePassword from "./container/ChangePassword";
import Menu from "./container/Menu";

import { user_auth, UserContext } from './context/UserContext';



ReactDOM.render((
  
<BrowserRouter >
        <UserContext.Provider value={user_auth}>
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/change-password" component={ChangePassword} />
              <Route exact path="/menu" component={Menu} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>),
  document.getElementById('root')
);


serviceWorker.register();