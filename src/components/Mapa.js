
import React, { useState, Fragment ,useEffect, useContext} from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";

import L from 'leaflet';
import { Button, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import NavigationBar from "../container/CNT_NavigationBar";
import FatalError from '../pages/NoMatch';
import  Footer from "./Footer";

import { UserContext } from '../context/UserContext';
import useFetch from '../fuctions/useFetch'
import { usePosition } from '../fuctions/usePosition';
import useDropdown from '../fuctions/useDropdown';
import { updateDataElement , getDataElement} from '../fuctions/CRUD';
import { Dist} from '../fuctions/calculaDistancias';


const Mapa = () => {


    const [ubiPersona, setubiPersona] = useState([]);
    const { latitude, longitude, error_position } = usePosition();
    const user_context = useContext(UserContext);

    useEffect(() => {

        const fetchData = async () => {
        
        const ubicacion  = [latitude, longitude]

        updateDataElement('usuarios', user_context.user_id ,'ubicacion', ubicacion);

            if (user_context.rol === 'memoreyo') {
                debugger;
                const data = await getDataElement('usuarios', 'id', user_context.user_id);
                setubiPersona(data.docs.map(doc => ({ ...doc.data() })));
            } else if (user_context.rol === 'cuidador') {
                debugger;
                const data = await getDataElement('usuarios', 'cuidador', user_context.user_id);
                setubiPersona(data.docs.map(doc => ({ ...doc.data() })));
            }

        };
        fetchData();


    }, [user_context]);


    const url = 'https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=España,Valencia,Torrent,Montreal 76, 14B&format=json'; 
    //const url = `https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=${user_context.pais},${user_context.ciudad},${user_context.domicilio}&format=json`;

    
    //const memo_list = ["Ana Bueno", "Tamara Montero", "Mateo"]
    const [personas, PersonaDropdown] = useDropdown("Buscar usuarios", ubiPersona);
    const { data, loading, error } = useFetch(url);
    const [activePoint, setActivePoint] = useState(null);

    var center = [personas.ubicacion.Pc, personas.ubicacion.Vc];
    var distanciaKM = Dist(data[0].lat ,data[0].lon, 
                            personas.ubicacion.Pc, personas.ubicacion.Vc);  

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

    if (loading)
        return <Spinner animation="grow" variant="info" />

    if (error )
        return <FatalError />

    return (

        <Fragment>
            <NavigationBar />
            <PersonaDropdown />
            <Map center={center} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[data[0].lat ,data[0].lon ]}
                    icon={casaIcon}
                    onClick={() => {
                        //console.log(data.lat + ' ' + data.lon);
                        //console.log('Ubicación' + latitude + ' ' + longitude);
                        setActivePoint(data);
                        debugger;
                    }}
                />

                <Marker
                    position={center}
                    icon={personIcon}
                    onClick={() => {
                        //console.log([ latitude, longitude]);
                        //setActivePoint(data);
                        debugger;
                    }}
                />

                <Circle center={[data[0].lat ,data[0].lon ]} fillColor="#4f94d4" radius={600} fillColor='blue' />

                {activePoint && (
                    <Popup
                        position={[
                            activePoint.lat,
                            activePoint.lon
                        ]}
                        onClose={() => {
                            setActivePoint(null);
                        }}
                    >
                        <div>
                            <p>{activePoint.display_name}</p>
                        </div>
                    </Popup>
                )}
            </Map>

            <div  className="d-flex justify-content-around mt-4">                
            <Button href="https://maps.google.com/?q=39.436250,-0.434350" className="button1 mr-3"  size="lg">Volver a casa </Button>

            <Button  href="tel://+34680980409" className="button1" size="lg">Llamar cuidador</Button>
            </div>
            <Footer />                
        </Fragment>
    )

};
export default withRouter(Mapa);

