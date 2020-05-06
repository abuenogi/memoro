import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import ChangePassword from "./components/ChangePassword";

import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));
/**
ReactDOM.render(

    <BrowserRouter >
        <Router>
            <div className="auth-inner">
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/sign-in" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/change-password" component={ChangePassword} />
                    <Route path="/home" component={Home} />
                </Switch>
            </div>

        </Router>
    </BrowserRouter>,
    document.getElementById("root")
);
*/


serviceWorker.register();