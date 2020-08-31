import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';

import Logo from '../images/logo192.png';
import { Button, Form, Label, Input } from 'reactstrap';

import useForm from "../functions/hooks/useFormLogin";
import {validateLogin} from "../functions/hooks/validateInput";


const Login = ({ onClickBotonLogin, onClickChangePass, onClickReg }) => {


    const { handleChange, handleSubmit, values, errors } = useForm(submit, validateLogin);
    

    function submit() {
        console.log("Submitted Succesfully");
        onClickBotonLogin(values);
    }

    
    return (

        <Fragment>
            <Form onSubmit={handleSubmit} noValidate >

                <h3 className="text-center mb-4">Iniciar sesión</h3>
                <img src={Logo} className="rounded mx-auto d-block  mb-5  mt-3" alt="aligment" />

                <div className="form-group">
                    <Label>Correo electrónico</Label>
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


                <Button type="submit" className="btn btn-block button1 mt-5" >Iniciar sesión </Button>

                <Button type="submit" className="btn btn-block button1" onClick={onClickReg}  >Registrate</Button>

                <p className="enlace text-right mt-4" onClick={onClickChangePass} >
                    ¿Has olvidado tu Contraseña?
                </p>
            </Form>
        </Fragment>
    );

}
export default withRouter(Login);