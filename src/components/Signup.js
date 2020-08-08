import React, { Fragment, useState } from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

import Modal from "./Modal";
import CampoMapa from "./CampoMapa";
import Layout from './Layout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faTrash, faMap } from "@fortawesome/free-solid-svg-icons";

import useForm from "../fuctions/useFormSignUp";
import { validateSignUp } from "../fuctions/validateInput";

const SignUp = ({ onClickBotonCreateUser, onClickVolver, history }) => {

    const location = useLocation();
    let ubicacion_casa = location.casa


    const { handleChange, handleSubmit, values, errors } = useForm(submit, validateSignUp);
    
    const [isOpened, setOpened] = useState(false);


    const openModal = () => {
        document.getElementById("root").disabled = true;
        document.querySelector("#modal-root").style.display = 'block';
       
        setOpened(true);
    }
    const closeModal = () => setOpened(false);


    function submit() {
        console.log("Submitted Succesfully");
        onClickBotonCreateUser(values.nombre, values.email, values.password, values.telefono, values.fechaNac, ubicacion_casa.lat, ubicacion_casa.lng);


    }

    return (
        <Layout >
            
            <Form onSubmit={handleSubmit} noValidate >
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
                    <Label>Dirección casa</Label>
                    <div className="d-flex justify-content-around">
                        <Input className="mr-3"
                            className={`${errors.casa && "inputError"}`}
                            name="casa"
                            type="text"
                            value={values.casa || ubicacion_casa || ''}
                            onChange={handleChange}
                        />
                        <Button className="ml-4" onClick={openModal}><FontAwesomeIcon icon={(fas, faMap)} size="1x" /> </Button>
                     
                        <Modal title="Welcome" isOpened={isOpened} onClose={closeModal}>
                        <CampoMapa 
                        //onClose={closeModal}
                        />
                        </Modal>

                
                    </div>
                    {errors.casa && <p className="error">{errors.casa}</p>}
                </div>

                <Button type="submit" className="btn btn-primary btn-block mt-5 button1"> Registrarse </Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>
            </Form>




        </Layout>
    );

}
export default withRouter(SignUp);

