import React, { Fragment } from "react";
import { withRouter, Link } from 'react-router-dom';
import Logo from '../images/logo192.png';
import { Button, Form, Label, Input } from 'reactstrap';


/*
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
*/
const Login = (props) => {

    //const { user,signInWithGoogle}  =props;

    return (

        <Fragment>
            <Form  >

                <h3 className="text-center mb-4">Iniciar sesión</h3>
                <img src={Logo} className="rounded mx-auto d-block  mb-5  mt-3" alt="aligment" />

                <div className="form-group">
                    <Label>Correo electrónico</Label>
                    <Input type="email" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <Label>Contraseña</Label>
                    <Input type="password" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>


                <Button type="submit" className="btn btn-primary btn-block button1" ><Link className="nav-link" to={"/sign-in"}>Iniciar</Link> </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" ><Link className="nav-link" to={"/sign-up"}>Registrarse</Link> </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" ><Link className="nav-link" to={"/menu"}>Menu</Link> </Button>
                
                <p className="forgot-password text-right mt-4">
                    ¿Has olvidado tu <Link className="enlace" to={"/change-password"}>contraseña?</Link>
                </p>
            </Form>
        </Fragment>
    );
    /*
    const firebaseAppAuth = firebaseApp.auth();

    const providers = {
        googleProvider: new firebase.auth.GoogleAuthProvider(),
    };
    */
}
export default withRouter(Login);