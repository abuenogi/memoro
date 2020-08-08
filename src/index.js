import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-big-scheduler/lib/css/style.css'
import "./index.css";


import App from "./App";

ReactDOM.render(  
  (<App />),
  document.getElementById('root')
);


serviceWorker.register();