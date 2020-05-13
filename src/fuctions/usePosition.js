import { useState, useEffect } from 'react';

 export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const  onChange = async ({ coords }) => {
        setPosition({
            latitude: await coords.latitude,
            longitude: await coords.longitude,
        });
    };
    const onError = (error) => {
        setError(error.message);
    };
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            console.log('Geolocation is not supported');
            setError('Geolocation is not supported');
            return;
        }
        const watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
    }, []);
    return { ...position, error };
}