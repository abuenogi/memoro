import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { Container } from 'react-bootstrap';
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faMapMarkedAlt, faMap, faUser, faMobile,faEnvelope, faCalendarAlt, faImage, faStreetView, faKey, faGlobe, faGlobeEurope, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import CampoMapa from "./CampoMapa";
import Layout from './Layout'
import useForm from "../functions/hooks/useFormSignUp";
import { validateSignUp } from "../functions/hooks/validateInput";

import { fetch_data } from '../functions/CRUD';

const SignUp = ({ onClickBotonCreateUser, onClickVolver, history }) => {

    var [nombre_direccion, setNombre_direccion] = useState('');

    let ubicacion_casa;
    let url = '';
  
    const location = useLocation();

    if (location.casa) {
        ubicacion_casa = location.casa
        url = `https://eu1.locationiq.com/v1/reverse.php?key=c7392af2aaffbc&lat=${ubicacion_casa.lat}&lon=${ubicacion_casa.lng}&format=json`;
    }

    useEffect(() => {

        let data = {}
       
        const fetchData = async () => {
    
            if (url)
            data = await fetch_data(url);
            if(data)
            setNombre_direccion(data.display_name);
        };

        fetchData();

    }, [url])


    
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
            <Container fluid className="form-style">
            <h3 className="text-center mb-4">Registro de usuario</h3>
            <div className="form-group-4">
            <Form onSubmit={handleSubmit} noValidate >
            
                <div className="form-group input-group">

                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faUser} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.nombre && "inputError"}`} 
                            name="nombre" 
                            placeholder="Nombre y apellidos"
                            value={values.nombre || ''}
                            onChange={handleChange}
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faEnvelope} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.email && "inputError"}`} 
                            name="email" 
                            placeholder="Correo electrónico"
                            value={values.email || ''}
                            onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faKey} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.password && "inputError"}`} 
                            name="password" 
                            placeholder="Contraseña"
                            type="password"
                            value={values.password || ''}
                            onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faMobile} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.telefono && "inputError"}`} 
                            name="telefono" 
                            placeholder="Teléfono"
                            type="number"
                            value={values.telefono || ''}
                            onChange={handleChange}
                    />
                    {errors.telefono && <p className="error">{errors.telefono}</p>}
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faCalendarAlt} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.fechaNac && "inputError"}`} 
                            name="fechaNac" 
                            placeholder="Fecha de nacimiento"
                            type="date"
                            value={values.fechaNac || ''}
                            onChange={handleChange}
                    />
                    {errors.fechaNac && <p className="error">{errors.fechaNac}</p>}
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faMapMarkedAlt} />
                                    </div>
                    </div>

                    <input className={`form-control ${errors.casa && "inputError"}`} 
                            name="casa" 
                            placeholder="Dirección casa"
                            type="text"
                            value={nombre_direccion || values.casa || ubicacion_casa || ''}
                            onChange={handleChange}
                    />

                        <Button className="ml-1" onClick={openModal}>
                            <FontAwesomeIcon icon={(fas, faMap)} /> 
                        </Button>
                     
                        <Modal title="Mapa de ubicación de casa" isOpened={isOpened} onClose={closeModal}>
                        <CampoMapa 
                        //onClose={closeModal}
                        />
                        </Modal>
                        {errors.casa && <p className="error">{errors.casa}</p>}
                </div>
                
                
                <div className="form-group">
                    <Button type="submit" className="btn btn-primary btn-block mt-5 button1"> Registrarse </Button>
                    <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>
                </div>
                
            </Form>
            </div>
        </Container>
        </Layout>
    );

}
export default withRouter(SignUp);

