import { useEffect } from 'react';

function useGeolocation(setStart) {
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
                
                setStart({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        );
    }, [setStart]);
}

export default useGeolocation;

