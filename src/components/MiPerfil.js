import React, { useContext, useState, useEffect } from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faTrash, faMap } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';
import Modal from "./Modal";
import { UserContext } from '../context/UserContext';
import CampoMapa from "./CampoMapa";
import Layout from './Layout'
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
            <Form onSubmit={handleSubmit} noValidate >
                <h3 className="text-center mt-4 mb-4">Datos usuario</h3>

                <Label>Foto de perfil</Label>
                <MemoAvatar
                    ref_storage={ref_storage}
                    child_storage={child_storage}
                />

                <div className="form-group">
                    <Label>Nombre completo</Label>
                    <div className="d-flex justify-content-around">
                        <Input
                            className={`${errors.nombre && "inputError"}`}
                            name="nombre"
                            type="text"
                            value={values.nombre}
                            onChange={handleChange}
                        />
                        <Button className="ml-4" onClick={onDelete}><FontAwesomeIcon icon={(fas, faTrash)} size="1x" /> </Button>
                    </div>

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
                            value={nombre_direccion || ubicacion_casa || values.casa || ''}
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

                <Button type="submit" className="btn btn-primary btn-block mt-4 button1"> Guardar cambios</Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>
            </Form>
            <Footer />
        </Layout>
    );

}
export default withRouter(MiPerfil);

