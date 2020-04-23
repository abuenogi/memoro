import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Navbar from "./components/Navbar";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (

    <Router>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/change-password" component={ChangePassword} />
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;

