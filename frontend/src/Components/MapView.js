import React, { useState, useEffect } from 'react';
import axios from "axios";
import MapDisplay from "../Helpers/MapDisplay";
import useGeoLocation from "../Helpers/GeoLocation";
import AirQualityCard from '../Helpers/AirQualityCard';


const MapView = () => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [route, setRoute] = useState([]);
    const [componentsList, setComponentsList] = useState([])
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(true);

    useGeoLocation(setStart);

    useEffect(() => {
        if (start) {
            setLocationLoading(false);
        }
    }, [start]);

    const handleSelect = (latlng) => {
        if (!start) {
            setStart(latlng);
        } else if (!end) {
            setEnd(latlng);
        } else {
            setStart(latlng);
            setEnd(null);
            setRoute([]);
            setComponentsList([]);
        }
    };

    const getRoute = async () => {
        if (!start || !end) return;

        setLoading(true);
        try {
            const res = await axios.post('https://ecoyatra.onrender.com/measureDistance', {
                start: [start.lng, start.lat],
                end: [end.lng, end.lat],
            });

            const coords = res.data.route;
            const latlngs = coords.map(([lng, lat]) => [lat, lng]);
            setRoute(latlngs);

            setComponentsList(res.data.componentsList);
        } catch (err) {
            console.error('Error fetching route:', err);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    📍 Navigate the Cleanest Way
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Click once to select <strong>destination</strong>, again to select <strong>end</strong>.
                </p>
            </div>

            {locationLoading && (
                <div className="text-center text-indigo-600 font-medium animate-pulse mt-10">
                    📍 Fetching your current location...
                </div>
            )}

            <MapDisplay
                start={start}
                end={end}
                route={route}
                handleSelect={handleSelect}
                center={start}
            />


            {!locationLoading && (
                <div className="flex flex-col items-center space-y-2 mt-4">
                    {start && end && (
                        loading ? (
                            <div className="flex items-center gap-3 justify-center bg-indigo-100 text-indigo-800 px-6 py-2 rounded">
                                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                <span>Calculating...</span>
                            </div>
                        ) : (
                            <button
                                onClick={getRoute}
                                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                            >
                                <span>Get Shortest Route</span>
                            </button>
                        )
                    )}

                    {componentsList && (
                        <AirQualityCard
                            componentsList={componentsList}
                        />
                    )}

                </div>
            )
            }
        </div >
    );
};

export default MapView;


