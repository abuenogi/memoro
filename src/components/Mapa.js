
import React, { useState, Fragment, useEffect, useContext } from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";

import L from 'leaflet';
import { Button, } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import NavigationBar from "../container/CNT_NavigationBar";
import FatalError from '../pages/NoMatch';
import Footer from "./Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faPhone, faMap } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from '../context/UserContext';

import { usePosition } from '../fuctions/usePosition';
import useDropdown from '../fuctions/useDropdown';

import { getDataByID, getDataElement } from '../fuctions/CRUD';
//import { Dist} from '../fuctions/calculaDistancias';


const Mapa = ({ history }) => {


    const { user_auth } = useContext(UserContext);
    const [ubiPersona, setubiPersona] = useState([]);
    const [cuidador, setCuidador] = useState({});
    const [activePoint, setActivePoint] = useState(null);

    const { latitude, longitude, error_position } = usePosition();
    const ubicacion = [latitude, longitude]

    useEffect(() => {

        const fetchData = async () => {

            if (user_auth.rol === 'memorenyo') {
                setubiPersona([JSON.parse(JSON.stringify(user_auth))]);
                const data = await getDataByID('usuarios', user_auth.cuidador);
                setCuidador(data.data())

            } else if (user_auth.rol === 'cuidador') {
                const data = await getDataElement('usuarios', 'cuidador', user_auth.id);
                setubiPersona(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }

        };
        fetchData();


    }, [user_auth]);

    console.log('cuidador-> ', cuidador);
    const [personas, PersonaDropdown] = useDropdown(ubiPersona);

    var obj_persona, persona_ubicacion, persona_casa, llamar_contacto, buscar_ubicacion, radio_distancia;
    //var distanciaKM = Dist(data[0].lat ,data[0].lon, personas.ubicacion.Pc, personas.ubicacion.Vc);

    if (cuidador && user_auth.rol === 'memorenyo') {
        //Si eres memo llamar a tu cuidador y tu casa
        persona_ubicacion = ubicacion;
        persona_casa = [user_auth.casa.Pc, user_auth.casa.Vc];
        radio_distancia = user_auth.radioSeguridad;
        llamar_contacto = `tel://${cuidador.telefono}`
        buscar_ubicacion = `https://maps.google.com/?q=${user_auth.casa.Pc}` + ',' + `${user_auth.casa.Vc}`

    }

    if (personas && user_auth.rol === 'cuidador') {

        obj_persona = JSON.parse(personas);
        debugger;
        //Si eres cuidador llamas a tu memo seleccionado y buscas su ubicación 
        persona_ubicacion = [obj_persona.ubicacion.Pc, obj_persona.ubicacion.Vc];
        persona_casa = [obj_persona.casa.Pc, obj_persona.casa.Vc];
        radio_distancia = obj_persona.radioSeguridad;
        llamar_contacto = `tel://${obj_persona.telefono}`
        buscar_ubicacion = `https://maps.google.com/?q=${obj_persona.ubicacion.Pc}` + ',' + `${obj_persona.ubicacion.Vc}`
    }


    const casaIcon = new L.Icon({
        iconUrl: require('../images/home-solid.svg'),
        iconRetinaUrl: require('../images/home-solid.svg'),
        iconAnchor: [15, 15],
        popupAnchor: [15, -15],
        iconSize: [30, 30],
        shadowUrl: require('../images/home-solid.svg'),
        shadowSize: [30, 30],
        shadowAnchor: [15, 15],
    })

    const personIcon = new L.Icon({
        iconUrl: require('../images/walking-solid.svg'),
        iconRetinaUrl: require('../images/walking-solid.svg'),
        iconAnchor: [15, 15],
        popupAnchor: [15, -15],
        iconSize: [30, 30],
        shadowUrl: require('../images/walking-solid.svg'),
        shadowSize: [30, 30],
        shadowAnchor: [15, 15],
    })



    if (error_position)
        return <FatalError />

    return (

        <Fragment>
            <NavigationBar />
            <PersonaDropdown />
            <Map center={persona_ubicacion} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={persona_casa}
                    icon={casaIcon}
                    onClick={() => {
                        setActivePoint(persona_casa);
                        debugger;
                    }}
                />

                <Marker
                    position={persona_ubicacion}
                    icon={personIcon}
                />

                <Circle center={persona_casa} fillColor="#4f94d4" radius={radio_distancia} fillColor='blue' />

                {activePoint && (
                    <Popup
                        position={
                            activePoint
                        }
                        onClose={() => {
                            setActivePoint(null);
                        }}
                    >
                        <div>
                            <p>{activePoint}</p>
                        </div>
                    </Popup>
                )}
            </Map>

            <div className="d-flex justify-content-around mt-4">
                <Button href={buscar_ubicacion}><FontAwesomeIcon icon={(fas, faMap)} size="2x" /> </Button>
                <Button href={llamar_contacto}><FontAwesomeIcon icon={(fas, faPhone)} size="2x" /> </Button>

            </div>
            <Button className="btn btn-block mt-4 button1" onClick={e => history.push('/home')}>Volver</Button>
            <Footer />
        </Fragment>
    )

};
export default withRouter(Mapa);

