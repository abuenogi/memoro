import React, { Fragment, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

const SignUp = ( {onClickBotonCreateUser, onClickVolver}) => {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseya, setContraseya] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');



    return (
        <Fragment>
            <Form >
                <h3 className="text-center mb-4">Crear usuario</h3>

                <div className="form-group">
                    <Label>Nombre completo</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className="form-group">
                    <Label>Correo electronico</Label>
                    <Input type="email" className="form-control" placeholder="" onChange={e => setCorreo(e.target.value)} />
                </div>
                
                <div className="form-group">
                    <Label>Contraseña</Label>
                    <Input type="password" className="form-control" placeholder="" onChange={e => setContraseya(e.target.value)} />
                </div>

                <div className="form-group">
                    <Label>Teléfono movil</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setTelefono(e.target.value)}/>
                </div>
                <div className="form-group">
                    <Label>Domicilio</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setDomicilio(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Ciudad</Label>
                    <Input type="text" className="form-control" placeholder=""  onChange={e => setCiudad(e.target.value)}/>
                </div>
                <div className="form-group">
                    <Label>Pais</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setPais(e.target.value)}/>
                </div>

                <Button type="submit" className="btn btn-primary btn-block mt-5 button1" onClick={ () => onClickBotonCreateUser(nombre, correo, contraseya, telefono, domicilio, ciudad, pais)} >Registrarse </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>

            </Form>
        </Fragment>
    );

}
export default withRouter(SignUp);