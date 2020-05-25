import React, { Fragment, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import useForm from "../fuctions/useFormSignUp";
import { validateSignUp } from "../fuctions/validateInput";

const SignUp = ({ onClickBotonCreateUser, onClickVolver }) => {

    
    const { handleChange, handleSubmit, values, errors } = useForm(submit, validateSignUp);

    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');


    function submit() {
        console.log("Submitted Succesfully");
        onClickBotonCreateUser(values.nombre, values.email, values.password, values.telefono, values.fechaNac, pais, ciudad, values.domicilio);

    }


    return (
        <Fragment>
            <Form onSubmit={handleSubmit} noValidate>
                <h3 className="text-center mb-4">Crear usuario</h3>

                <div className="form-group">
                    <Label>Nombre completo</Label>
                    <Input
                        className={`${errors.nombre && "inputError"}`}
                        name="nombre"
                        type="text"
                        value={values.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}
                </div>

                <div className="form-group">
                    <Label>Correo electronico</Label>
                    <Input
                        className={`${errors.email && "inputError"}`}
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <Label>Contraseña</Label>
                    <Input
                        className={`${errors.password && "inputError"}`}
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <Label>Teléfono movil</Label>
                    <Input
                        className={`${errors.telefono && "inputError"}`}
                        name="telefono"
                        type="number"
                        value={values.telefono}
                        onChange={handleChange}
                    />
                    {errors.telefono && <p className="error">{errors.telefono}</p>}
                </div>

                <div className="form-group">
                    <Label>Fecha de nacimiento</Label>
                    <Input
                        className={`${errors.fechaNac && "inputError"}`}
                        name="fechaNac"
                        type="date"
                        value={values.fechaNac}
                        onChange={handleChange}
                    />
                    {errors.fechaNac && <p className="error">{errors.fechaNac}</p>}
                </div>

                <div className="form-group">
                    <Label>Pais</Label>
                    <CountryDropdown type="selector" className="form-control"
                        value={pais}
                        onChange={(val) => setPais(val)} />
                </div>

                <div className="form-group">
                    <Label >Provincia</Label>
                    <RegionDropdown type="selector" className="form-control"
                        country={pais}
                        value={ciudad}
                        onChange={(val) => setCiudad(val)} />
                </div>

                <div className="form-group">
                    <Label>Domicilio</Label>
                    <Input
                        className={`${errors.domicilio && "inputError"}`}
                        name="domicilio"
                        type="text"
                        value={values.domicilio}
                        onChange={handleChange}
                    />
                    {errors.domicilio && <p className="error">{errors.domicilio}</p>}
                </div>

                <Button type="submit" className="btn btn-primary btn-block mt-5 button1"> Registrarse </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>

            </Form>
        </Fragment>
    );

}
export default withRouter(SignUp);

