
import React, { useState, Fragment} from "react";
import { withRouter, useLocation } from 'react-router-dom';
import { Button } from 'reactstrap';

import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import { usePosition } from '../functions/hooks/usePosition';
import FatalError from './NoMatch';


const CampoMapa = ({ history}) => {

    const { latitude, longitude, error_position } = usePosition();
    const center = {
        latitude: latitude,
        longitude: longitude,
    }
    const [ubiCasa, setUbiCasa] = useState([center.latitude,center.longitude]);
   

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

    if (error_position)
    return <FatalError />

    return (

        <Fragment>
            <h3 className="text-center mb-5">Buscar casa en el mapa</h3>

            <Map center={[center.latitude, center.longitude]} zoom={15}
                onClick={(e) => {
                    setUbiCasa(e.latlng);
       
                }} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[center.latitude, center.longitude]}
                    icon={personIcon}
                    onClick={() => {
              
                    }}
                />
                <Marker
                    position={ubiCasa}
                    icon={casaIcon}
                    onClick={(e) => {
                        console.log(ubiCasa);
                      
                    }}
                />

            </Map>
            <Button type="submit" className="btn-block mt-2 button1"
                
                onClick={e => { 
                   
                    document.querySelector("#modal-root").style.display = 'none';
                    history.push(
                    {
                        pathname: window.location.pathname,
                        state: 1,
                        casa: ubiCasa
                      }) }}
            > Volver</Button>
            <Button type="submit" className="btn-block mt-2 button1"
                onClick={e => {                    
                    document.querySelector("#modal-root").style.display = 'none';
                     }}
            > Cancelar</Button>
        </Fragment>
    )

};
export default withRouter(CampoMapa);

