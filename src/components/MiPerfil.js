import React, { useContext, useState, useEffect } from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faMapMarkedAlt, faMap, faUser, faMobile,faEnvelope, faCalendarAlt, faKey } from "@fortawesome/free-solid-svg-icons";

import { confirmAlert } from 'react-confirm-alert';
import Modal from "./Modal";
import { UserContext } from '../context/UserContext';
import CampoMapa from "./CampoMapa";
import Layout from './Layout'
import { Container } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

import MemoAvatar from '../container/CNT_MemoAvatar';
import useForm from "../functions/hooks/useFormSignUp";
import { validateSignUp } from "../functions/hooks/validateInput";
import { fetch_data } from '../functions/CRUD';


const MiPerfil = ({ onClickSave, onClickVolver, onClickBorrarUsuario }) => {


    const location = useLocation();

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(submit, validateSignUp);
    const { user_auth } = useContext(UserContext);
    const [ubi_final, setUbi_final] = useState({});
    const [ref_storage, setRef_storage] = useState('');
    const [child_storage, setChild_storage] = useState('');
    const [isOpened, setOpened] = useState(false);
    var [nombre_direccion, setNombre_direccion] = useState('');
    var [url, setURL] = useState('');

    var ubicacion_casa = location.casa;

    useEffect(() => {

        if (ubicacion_casa)
        setURL(`https://eu1.locationiq.com/v1/reverse.php?key=c7392af2aaffbc&lat=${ubicacion_casa.lat}&lon=${ubicacion_casa.lng}&format=json`);

    }, [location.casa])


    useEffect(() => {

        setRef_storage('usuarios');
        setChild_storage(user_auth.id);

        const usuario = {

            nombre: user_auth.nombre,
            email: user_auth.email,
            password: '******',
            telefono: user_auth.telefono,
            fechaNac: user_auth.fechaNac,
            casa: '(' + user_auth.casa.latitude + ', ' + user_auth.casa.longitude + ')'

        };

        setValues(usuario)
        setUbi_final({
            casa: {
                latitude: user_auth.casa.latitude,
                longitude: user_auth.casa.longitude
            }
        })


        setURL(`https://eu1.locationiq.com/v1/reverse.php?key=c7392af2aaffbc&lat=${user_auth.casa.latitude}&lon=${user_auth.casa.longitude}&format=json`);

    }, [user_auth])


    useEffect(() => {

        let data = ''

        const fetchData = async () => {

            if (url)
                data = await fetch_data(url);
            if (data !== '')
                setNombre_direccion(JSON.parse(data).display_name);
        };

        fetchData();

    }, [url])





    const openModal = () => {
        document.getElementById("root").disabled = true;
        document.querySelector("#modal-root").style.display = 'block';

        setOpened(true);
    }
    const closeModal = () => setOpened(false);

    const onDelete = () => {

        confirmAlert({
            title: 'Borrar usuario',
            message: '¿Quiere eliminar el usuario ' + user_auth.nombre + '?',
            buttons: [
                {
                    label: 'No',
                },
                {
                    label: 'Si',
                    onClick: () => {
                        onClickBorrarUsuario()
                    }
                }
            ]
        });

    }
    function submit() {

        console.log("Submitted Succesfully");
        if (ubicacion_casa) {
            let ubicacion = { casa: { latitude: ubicacion_casa.lat, longitude: ubicacion_casa.lng } };
            onClickSave(values.nombre, values.email, values.password, values.telefono, values.fechaNac, ubicacion);
        } else {
            onClickSave(values.nombre, values.email, values.password, values.telefono, values.fechaNac, ubi_final);
        }
    }


    return (
        <Layout >
            <NavigationBar />
            <Container fluid className="form-style">
            <h3 className="text-center mb-4">Datos del usuario</h3>
            <div className="form-group-4">
            <Form onSubmit={handleSubmit} noValidate >               

                <MemoAvatar
                    ref_storage={ref_storage}
                    child_storage={child_storage}
                />


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

                {/*
                El email no puede cambiarse así como la password, sólo podría hacerse si se actualiza Authtnetication de firebase
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
                */}

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={fas, faMobile} />
                        </div>
                    </div>
                    <input className={`form-control ${errors.telefono && "inputError"}`} 
                            name="telefono" 
                            placeholder="Teléfono móvil"
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

                <Button type="submit" className="btn btn-primary btn-block mt-4 button1"> Guardar cambios</Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>
            </Form>
            </div>
             </Container>
            <Footer />
        </Layout>
    );

}
export default withRouter(MiPerfil);

