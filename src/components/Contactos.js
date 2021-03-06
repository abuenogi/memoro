
import React, { useState, Fragment, useEffect, useContext } from "react";
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSms, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from "../functions/hooks/useDropdown";
import CardMemo from './CardMemo';
import { UserContext } from '../context/UserContext';
import { getDataElement } from '../functions/CRUD';
import {
    storage
} from '../services/firebase/firebaseConfig.js';



const Contactos = ({ history }) => {


    const { user_auth } = useContext(UserContext);
    const [contactosResult, setContactosResult] = useState([]);
    const [contacto_selected, ContactoDropdown] = useDropdown(contactosResult);

    let obj_contacto, llamar_contacto, enviar_whatsApp, nombre_contacto, telefono_contacto;


    useEffect(() => {

        const fetchData = async () => {

            if (user_auth.rol === 'memorenyo') {
                //setContactosResult(data.docs.map(doc => ({ ...doc.data().contactos })));
                setContactosResult(Object.values(user_auth.contactos));
            } else if (user_auth.rol === 'cuidador') {

                const data = await getDataElement('usuarios', 'cuidador', user_auth.id);
                //setContactosResult(data.docs.map(doc => ({ ...doc.data().nombre, ...doc.data().telefono })));
                setContactosResult(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }
            console.log('contactosResult: ', contactosResult);

        };
        fetchData();


    }, [user_auth.id]);

   

    if (contacto_selected) {
        obj_contacto = JSON.parse(contacto_selected);

        nombre_contacto = obj_contacto.nombre
        telefono_contacto = obj_contacto.telefono
        llamar_contacto = `tel://${telefono_contacto}`
        enviar_whatsApp = `https://api.whatsapp.com/send?phone=+34${telefono_contacto}&text=Llamame%20por%20favor`

        let ref_storage = ''
        let child_storage = ''

        if (user_auth.rol === 'memorenyo') {

            ref_storage = 'contactos'
            child_storage = obj_contacto.telefono

        } else {

            ref_storage = 'usuarios'
            child_storage = obj_contacto.id
        }

        storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url => {
            // `url` is the download URL for 'images/stars.jpg'
            var img = document.querySelector('.foto_de_perfil');
            img.src = url;

        }).catch(function (error) {
            console.log(error)
        });
    }

        return (

            <Fragment>
                <NavigationBar />
                <ContactoDropdown />
                <CardMemo
                    memo={nombre_contacto}
                    telefono={telefono_contacto}
                />
                <div className="d-flex justify-content-around mt-4">

                    <Button href={llamar_contacto}><FontAwesomeIcon icon={(fas, faPhone)} size="2x" /> </Button>
                    <Button href={enviar_whatsApp}><FontAwesomeIcon icon={(fas, faSms)} size="2x" /> </Button>
                </div>
                <Button className="btn btn-block mt-4 button1" onClick={e => history.push('/home')}>Volver</Button>
                <Footer />
            </Fragment>
        )

    };
    export default withRouter(Contactos);

