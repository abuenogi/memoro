
import React, { useState, Fragment , useContext} from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";

import L from 'leaflet';
import { Button, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import NavigationBar from "../container/CNT_NavigationBar";
import FatalError from '../pages/NoMatch';
import  Footer from "./Footer";

import { UserContext } from '../context/UserContext';
import { usePosition } from '../fuctions/usePosition';
import useFetch from '../fuctions/useFetch'
import useDropdown from '../fuctions/useDropdown';


const Mapa = () => {


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

    const center = [39.436250, -0.434350]
    const center_ubi = [39.436932, -0.465240]

    const user_context = useContext(UserContext);
    const memo_list = ["Ana Bueno", "Tamara Montero", "Mateo"]
    const [memo, MemoDropdown] = useDropdown("Memo", memo_list);

 
    const url = 'https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=España,Valencia,Torrent,Montreal 76, 14B&format=json'; 
    //const url = `https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=${user_context.pais},${user_context.ciudad},${user_context.domicilio}&format=json`;

    const { data, loading, error } = useFetch(url);
    const { latitude, longitude, error_position } = usePosition();
    const [activePoint, setActivePoint] = useState(null);


    debugger;

    if (loading)
        return <Spinner animation="grow" variant="info" />

    if (error || error_position)
        return <FatalError />

    return (

        <Fragment>
            <NavigationBar />
            <MemoDropdown />
            <Map center={center} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={center}
                    icon={casaIcon}
                    onClick={() => {
                        console.log(data.lat + ' ' + data.lon);
                        console.log('Ubicación' + latitude + ' ' + longitude);
                        //setActivePoint(data);
                        debugger;
                    }}
                />

                <Marker
                    position={center_ubi}
                    icon={personIcon}
                    onClick={() => {
                        console.log(data.lat + ' ' + data.lon);
                        console.log('Ubicación' + latitude + ' ' + longitude);
                        //setActivePoint(data);
                        debugger;
                    }}
                />

                <Circle center={center} fillColor="#4f94d4" radius={600} fillColor='blue' />

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

