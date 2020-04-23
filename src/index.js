import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import '../node_modules/bootstrap/dist/css/bootstrap.css';




ReactDOM.render(

    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);


serviceWorker.register();