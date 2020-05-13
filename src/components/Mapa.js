
import React, { useState, Fragment } from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Button, Spinner} from 'reactstrap';
import { withRouter } from 'react-router-dom';

import  NavigationBar from "../container/NavigationBar";
import FatalError from './500';



import { usePosition } from '../fuctions/usePosition';
import useFetch from '../fuctions/useFetch'
import useDropdown from '../fuctions/SelectMemo';





const Mapa = () => {

    const shoe_list = ["Ana Bueno", "Tamara Montero", "Mateo"]

    const [shoe, ShoeDropdown ] = useDropdown("Shoes", shoe_list);
      

    const [activePoint, setActivePoint] = useState(null);

    const url = 'https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=España,Valencia,Torrent,Montreal 76, 14B&format=json';

    const { data, loading, error } = useFetch(url);
    const { latitude, longitude, error_position } = usePosition();

    debugger;

    if (loading)
        return <Spinner animation="grow" variant="info" />

    if (error || error_position)
        return <FatalError />

    return (

        <Fragment>
        <NavigationBar/> 
        <ShoeDropdown />  
        <Map center={[39.436250, -0.434350]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
                position={[39.436250, -0.434350]}
                onClick={() => {
                    console.log(data.lat + ' ' + data.lon);
                    console.log('Ubicación' + latitude + ' ' + longitude);
                    setActivePoint(data);
                    debugger;
                }}
            />

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

        <Button color="secondary mt-4" size="lg">Volver a casa</Button>{' '}
        <Button color="secondary mt-4" size="lg">Lamar cuidar</Button>

        </Fragment>
    )

};
export default withRouter(Mapa);


/*

//import useSwr from "swr";
import { Icon } from "leaflet";

//const fetcher = (...args) => fetch(...args).then(response => response.json());


const icon = new Icon({
    iconUrl: "../images/skateboarding.svg",
    iconSize: [25, 25]
});


const url =
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, fetcher);
    const points = data && !error ? data.slice(0, 100) : [];
    const [activePoint, setActivePoint] = useState(null);

    return (
        <Map center={[52.6376, -1.135171]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {points.map(point => (
                <Marker
                    key={point.id}
                    position={[point.location.latitude, point.location.longitude]}
                    icon={icon}
                    onClick={() => {
                        setActivePoint(point);
                    }}
                />
            ))}

            {activePoint && (
                <Popup
                    position={[
                        activePoint.location.latitude,
                        activePoint.location.longitude
                    ]}
                    onClose={() => {
                        setActivePoint(null);
                    }}
                >
                    <div>
                        <h2>{activePoint.category}</h2>
                    </div>
                </Popup>
            )}
        </Map>
    );

*/