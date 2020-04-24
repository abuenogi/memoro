import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const CangePassword = (props) => {

    //const { user,signInWithGoogle}  =props;

    return (

        <Fragment>
            <Form  >
                <h3 className="text-center mb-4" >Cambiar contraseña</h3>
                <div className="form-group" >
                    <Label>Correo electrónico</Label>
                    <Input type="email" className="form-control" placeholder="" />
                </div>
                <Button type="submit" className="btn btn-primary btn-block mt-3  button1" ><Link className="nav-link" to={"/change-password"}>Enviar correo</Link> </Button>
                
                <p className=" text-center mt-5" >Te enviará un correo con tu nueva contraseña</p>
                <p className="forgot-password text-right mt-4">
                    Volver a <Link className="enlace"  to={"/sign-in"}>iniciar sesión</Link>
                </p>
            </Form>
        </Fragment>
    );

}
export default withRouter(CangePassword);