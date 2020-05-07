import React, { Fragment, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import useForm from "../fuctions/useFormLogin";
import validate from "../fuctions/validateInput";

const SignUp = ({ onClickBotonCreateUser, onClickVolver }) => {

    
    const { handleChange, handleSubmit, values, errors } = useForm(submit, validate);

    function submit() {
        console.log("Submitted Succesfully");
        onClickBotonCreateUser(values);
    }


    return (
        <Fragment>
            <Form >
                <h3 className="text-center mb-4">Crear usuario</h3>

                <div className="form-group">
                    <Label>Nombre completo</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setNombre(e.target.value)} />

                    <Input
                        className={`${errors.email && "inputError"}`}
                        name="nombre"
                        type="text"
                        value={values.}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
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
                    <Input type="text" className="form-control" placeholder="" onChange={e => setTelefono(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Fecha de nacimiento</Label>
                    <Input type="date" name="date" onChange={e => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                        <Label>Pais</Label>
                        <CountryDropdown type="selector" className="form-control" 
                            value={pais}
                            onChange={(val)=>setPais(val)} />
                </div>
                <div className="form-group">
                        <Label >Ciudad</Label>            
                        <RegionDropdown type="selector" className="form-control"
                            country={pais}
                            value={ciudad}
                            onChange={(val) =>setCiudad(val)} />
                </div>

                <div className="form-group">
                    <Label>Domicilio</Label>
                    <Input type="text" className="form-control" placeholder="" onChange={e => setDomicilio(e.target.value)} />
                </div>

                <Button type="submit" className="btn btn-primary btn-block mt-5 button1" >Registrarse </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>

            </Form>
        </Fragment>
    );

}
export default withRouter(SignUp);