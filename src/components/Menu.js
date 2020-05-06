import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
 
import Calendario from "./Calendario";
import Entretenimiento from "./Entretenimiento";
import Contactos from "./Contactos";
import Mapa from "./Mapa";
 

// Páginas internas
function Calendario() {
    return <h2>Calendario</h2>;
  }
  
  function Entretenimiento() {
    return <h2>Entretenimiento</h2>;
  }
  
  function Contactos() {
    return <h2>Contactos</h2>;
  }

  function Mapa() {
    return <h2>Mapa</h2>;
  }


class Menu extends React.Component {
  render() {
    return (
        <Router>
        <div className={"site-content"}>
          // Menú de navegación
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/calendario/">Calendario</Link>
              </li>
              <li>
                <Link to="/entretenimiento/">Entretenimiento</Link>
              </li>
              <li>
                <Link to="/contactos/">Contactos</Link>
              </li>
              <li>
                <Link to="/mapa/">Mapa</Link>
              </li>
            </ul>
          </nav>
          // Anclado de rutas al contenido
          <Route path="/" exact component={Home} />
          <Route path="/calendario/" component={Calendario} />
          <Route path="/entretenimiento/" component={Entretenimiento} />
          <Route path="/contactos/" component={Contactos} />
          <Route path="/mapa/" component={Mapa} />
        </div>
      </Router>
    );
  }
} 
export default Menu;