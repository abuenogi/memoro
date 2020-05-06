import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./App.css";


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
=======
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ChangePassword from "./components/ChangePassword";

import App from './App';


ReactDOM.render(

    <BrowserRouter >
        <Router>
            <div className="auth-inner">
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/sign-in" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/change-password" component={ChangePassword} />
                    <Route path="/home" component={App} />
                </Switch>
            </div>

        </Router>
    </BrowserRouter>,
    document.getElementById("root")
);



serviceWorker.register();