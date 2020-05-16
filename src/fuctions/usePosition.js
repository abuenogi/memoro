import { useState, useEffect } from 'react';

export const usePosition = () => {
    const [position, setPosition] = useState({latitude:39.470242, longitude: -0.376800 });
    const [error, setError] = useState(null);

    const onChange = ({ coords }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };
    const onError = (error) => {
        setError(error.message);
    };
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        geo.getCurrentPosition((position) => {

            console.log(position);
        });
        /*
        setPosition({
            latitude: geo.getCurrentPosition().coords.latitude, longitude: geo.getCurrentPosition().coords.longitude
            
        })
        */
        var watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
    }, []);
    return { ...position, error };
}