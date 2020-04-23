import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

const SignUp = (props) => {




    return (
        <Fragment>
            <Form >
                <h3>Formulario de registro</h3>

                <div className="form-group">
                    <Label>Usuario</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <Label>Contraseña</Label>
                    <Input type="password" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <Label>Repetir contraseña</Label>
                    <Input type="password" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <Label>Correo electronico</Label>
                    <Input type="email" className="form-control" placeholder="" />
                </div>

                <div className="form-group">
                    <Label>Teléfono movil</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                    <Label>Domicilio</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                    <Label>Ciudad</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                    <Label>Pais</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>

                <Button type="submit" className="btn btn-primary btn-block">Registrarse</Button>
                <p className="forgot-password text-right">
                    ¿Ya tienes cuenta? <Link to={'/sign-in'}> Iniciar sesión</Link>
                </p>

            </Form>
        </Fragment>
    );

}
export default withRouter(SignUp);