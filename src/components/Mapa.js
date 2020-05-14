
import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer , Circle} from "react-leaflet";
import { withRouter } from 'react-router-dom';
import {usePosition} from '../fuctions/usePosition';




const Mapa = () => {

  
    const {latitude, longitude, error} = usePosition();


    const url = 'https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=España,Valencia,Torrent,Montreal 76, 14B&format=json';

    var point = new Object();

    point.lat = 39.470240
    point.lon = -0.376800

    useEffect(() => {
    
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(function (doc) {
                point = Object.assign(doc);
            })
        })
        .catch(error => {
            console.log(error);
        })
      
      },
        [url]
      )

    //`/api/resource/${id}`

    const [activePoint, setActivePoint] = useState(null);

    debugger;

    return (

        <Map center={[39.436250, -0.434350]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
                position={[point.lat, point.lon]}
                onClick={() => {
                    console.log(point.lat + ' ' + point.lon);
                    console.log('Ubicación' + latitude + ' ' + longitude);
                    setActivePoint(point);
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
    );

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