
import React, { useState, Fragment, useEffect, useContext } from "react";
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from '../fuctions/useDropdown';
import CardMemo from './CardMemo';
import { UserContext } from '../context/UserContext';
import { getDataElement } from '../fuctions/CRUD';


const Contactos = () => {


    const user_context = useContext(UserContext);

    const [contactosResult, setContactosResult] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            
            alert('info: ' ,user_context.user_id );
            if (user_context.rol === 'memoreyo') {
                debugger;
                const data = await getDataElement('usuarios', 'id', user_context.user_id);
                alert(data);
                setContactosResult(data.docs.map(doc => ({ ...doc.data().contactos })));
            } else if (user_context.rol === 'cuidador') {
                debugger;
                alert(data);
                const data = await getDataElement('usuarios', 'cuidador', user_context.user_id);
                setContactosResult(data.docs.map(doc => ({ ...doc.data().nombre, ...doc.data().telefono })));
            }

        };
        fetchData();


    }, [user_context.user_id]);

    console.log('Los contactos: ', contactosResult);
    const [contacto_selected, ContactoDropdown] = useDropdown("Selecciona un contacto...", contactosResult);

    const llamar_contacto = `tel://${contacto_selected.telefono}`
    const enviar_whatsApp = `https://api.whatsapp.com/send?phone=${contacto_selected.telefono}&text=Llamame%20por%20favor`

    return (

        <Fragment>
            <NavigationBar />
            <ContactoDropdown />
            <CardMemo
                memo={contacto_selected}
            />
            <div className="d-flex justify-content-around mt-4">
                <Button href={llamar_contacto} className="button1 mr-3" size="lg">Llamar cuidador</Button>
                <Button href={enviar_whatsApp} className="button1" size="lg">Enviar WhatsApp</Button>
            </div>
            <Footer />
        </Fragment>
    )

};
export default withRouter(Contactos);

