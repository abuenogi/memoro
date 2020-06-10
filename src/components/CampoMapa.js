
import React, { useState, Fragment, useEffect, useContext } from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Button } from 'reactstrap';
import L from 'leaflet';

import { withRouter, useLocation } from 'react-router-dom';
import { usePosition } from '../fuctions/usePosition';



const CampoMapa = ({ history }) => {

    const location = useLocation();
    const { latitude, longitude, error_position } = usePosition();
    debugger;
    const center = {
        latitude: latitude,
        longitude: longitude,
    }
    const [ubiCasa, setUbiCasa] = useState([center.latitude,center.longitude]);
    //const [ubiCasa, setUbiCasa] = useState(center);
    const [activePoint, setActivePoint] = useState(null);

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

    return (

        <Fragment>
            <h3 className="text-center mb-5">Buscar ubicación casa</h3>

            <Map center={[center.latitude, center.longitude]} zoom={15}
                onClick={(e) => {
                    setUbiCasa(e.latlng);
                    //setActivePoint(e.latlng);
                }} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[center.latitude, center.longitude]}
                    icon={personIcon}
                    onClick={() => {
                        //console.log([ latitude, longitude]);
                        //setActivePoint(data);
                        debugger;
                    }}
                />
                <Marker
                    position={ubiCasa}
                    icon={casaIcon}
                    onClick={(e) => {
                        console.log(ubiCasa);
                        //setActivePoint(ubiCasa);
                        debugger;
                    }}
                />

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
            <Button type="submit" className="btn-block mt-5 button1"
                onClick={e => { 
                    history.push(
                    {
                        pathname: '/sign-up',
                        state: 1,
                        casa: ubiCasa
                      }) }}
            > Volver</Button>
        </Fragment>
    )

};
export default withRouter(CampoMapa);

