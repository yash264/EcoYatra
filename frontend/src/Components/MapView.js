import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationSelector({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng);
        },
    });
    return null;
}

const MapView = () => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [route, setRoute] = useState([]);
    const [aqi, setAqi] = useState(null);

    const handleClick = (latlng) => {
        if (!start) {
            setStart(latlng);
        } else if (!end) {
            setEnd(latlng);
        }
    };

    const getRoute = async () => {
        if (!start || !end) return;

        try {
            const res = await axios.post('http://localhost:5000/api/route', {
                start: [start.lng, start.lat],
                end: [end.lng, end.lat],
            });

            const coords = res.data.route.features[0].geometry.coordinates;
            const latlngs = coords.map(([lng, lat]) => [lat, lng]);

            setRoute(latlngs);
            setAqi(res.data.averageAQI);
        } catch (err) {
            console.error(err);
        }
    };

    const reset = () => {
        setStart(null);
        setEnd(null);
        setRoute([]);
        setAqi(null);
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-green-700">
                🛣️ Pollution-Aware Route
            </h2>
            <p className="text-center mb-4 text-gray-600">Click on the map to set Start and End points.</p>

            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md mb-4">
                <MapContainer
                    center={[28.6139, 77.2090]}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationSelector onSelect={handleClick} />
                    {start && <Marker position={start} icon={customIcon} />}
                    {end && <Marker position={end} icon={customIcon} />}
                    {route.length > 0 && <Polyline positions={route} color="green" />}
                </MapContainer>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {end && (
                    <button
                        onClick={getRoute}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow"
                    >
                        Get Route
                    </button>
                )}
                <button
                    onClick={reset}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow"
                >
                    Reset
                </button>
            </div>

            {aqi && (
                <div className="mt-4 text-center">
                    <p className="text-lg font-medium">
                        <strong>Average AQI:</strong>{" "}
                        <span className={`font-semibold ${aqi <= 2 ? "text-green-600" : aqi <= 3 ? "text-yellow-500" : "text-red-600"}`}>
                            {aqi} ({aqi <= 2 ? "Good" : aqi <= 3 ? "Moderate" : "Poor"})
                        </span>
                    </p>
                </div>
            )}

        </div>
    );
};

export default MapView;
