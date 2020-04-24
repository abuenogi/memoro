import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

const SignUp = (props) => {




    return (
        <Fragment>
            <Form >
                <h3 className="text-center mb-4">Formulario de registro</h3>

                <div className="form-group">
                    <Label>Nombre completo</Label>
                    <Input type="text" className="form-control" placeholder="" />
                </div>

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

                <Button type="submit" className="btn btn-primary btn-block button1" ><Link className="nav-link" to={"/sign-up"}>Registrarse</Link> </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" ><Link className="nav-link" to={"/sign-in"}>Volver</Link> </Button>

            </Form>
        </Fragment>
    );

}
export default withRouter(SignUp);