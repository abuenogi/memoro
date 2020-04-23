import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Navbar} from 'reactstrap';

const NavbarComp = (props) => {

    
    return (

        <Fragment >
            <Navbar  className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Memoro</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Iniciar sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Registrarse</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>
        </Fragment>


    )

}
export default withRouter(NavbarComp);