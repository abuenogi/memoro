import React, { useContext, useState, useEffect } from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import Avatar from 'react-avatar-edit'
//import ModalMapa from './ModalMapa'
import Modal from "./Modal";
import { UserContext } from '../context/UserContext';
import CampoMapa from "./CampoMapa";
import Layout from './Layout'


import useForm from "../fuctions/useFormSignUp";
import { validateSignUp } from "../fuctions/validateInput";

const MiPerfil = ({ onClickSave, onClickVolver, onClickBorrarUsuario}) => {

    
    const { handleChange, handleSubmit, values, setValues, errors } = useForm(submit, validateSignUp);
    const { user_auth } = useContext(UserContext);

    const [ubi_final, setUbi_final] = useState({});
   
    let ubicacion_casa;

    const location = useLocation();
    
    if(location.casa) {
        ubicacion_casa = location.casa
    }

    useEffect(() => {
            
        const usuario = {

            nombre: user_auth.nombre,
            email: user_auth.email,
            password: '******',
            telefono: user_auth.telefono,
            fechaNac: user_auth.fechaNac,
            casa: '('+ user_auth.casa.latitude + ', ' + user_auth.casa.longitude + ')'

        };
        
        setValues(usuario)
        setUbi_final({casa: {
        latitude: user_auth.casa.latitude,
        longitude: user_auth.casa.longitude
        }})
       
    }, [user_auth])

    const [isOpened, setOpened] = useState(false);


    const openModal = () => {
        document.getElementById("root").disabled = true;
        document.querySelector("#modal-root").style.display = 'block';

        setOpened(true);
    }
    const closeModal = () => setOpened(false);


    function submit() {

        console.log("Submitted Succesfully");

        debugger;
        if(ubicacion_casa){
            let ubicacion =  {casa: {latitude: ubicacion_casa.lat, longitude: ubicacion_casa.lng}};
            onClickSave(values.nombre, values.email, values.password, values.telefono, values.fechaNac, ubicacion);
        }else{
            onClickSave(values.nombre, values.email, values.password, values.telefono, values.fechaNac, ubi_final);
        }
    }


    return (
        <Layout >
            <Form onSubmit={handleSubmit} noValidate >
                <h3 className="text-center mb-4">Datos usuario</h3>

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
                            value={ubicacion_casa || values.casa ||  ''}
                            onChange={handleChange}
                        />
                        <Button className="button1 ml-3" size="lg"
                            onClick={openModal}
                        >Mapa </Button>
                        <Modal title="Welcome" isOpened={isOpened} onClose={closeModal}>
                            <CampoMapa
                            //onClose={closeModal}
                            />
                        </Modal>


                    </div>
                    {errors.casa && <p className="error">{errors.casa}</p>}
                </div>

                <Button type="submit" className="btn button1"
                onClick={onClickBorrarUsuario}
                > Borrar usuario</Button>

                <Button type="submit" className="btn btn-primary btn-block mt-5 button1"> Guardar cambios</Button>
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickVolver}> Volver </Button>
            </Form>

        </Layout>
    );

}
export default withRouter(MiPerfil);

