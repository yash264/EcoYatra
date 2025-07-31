import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's missing marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component for selecting points on map
function LocationSelector({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng);
        },
    });
    return null;
}

export default function App() {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [route, setRoute] = useState([]);
    const [aqi, setAqi] = useState(null);

    const handleSelect = (latlng) => {
        if (!start) {
            setStart(latlng);
        } else if (!end) {
            setEnd(latlng);
        } else {
            setStart(latlng);
            setEnd(null);
            setRoute([]);
            setAqi(null);
        }
    };

    const getRoute = async () => {
        if (!start || !end) return;

        try {
            const res = await axios.post('http://localhost:5000/api/measureDistance', {
                start: [start.lng, start.lat],
                end: [end.lng, end.lat],
            });

            console.log(res.data);

            const coords = res.data.route; // Already an array of [lng, lat]
            const latlngs = coords.map(([lng, lat]) => [lat, lng]); // Convert to [lat, lng] for Leaflet

            setRoute(latlngs);

            const aqiValue = res.data.averageAQI;
            setAqi(
                aqiValue !== null && aqiValue !== undefined
                    ? aqiValue.toFixed(2)
                    : 'N/A'
            );
        } catch (err) {
            console.error("Error fetching route:", err);
        }
    };


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>🚲 Least Polluted Route Finder</h2>
            <p style={{ textAlign: 'center' }}>
                Click once to select <strong>start</strong>, again to select <strong>end</strong>.
            </p>

            <MapContainer
                center={[28.6139, 77.2090]}
                zoom={13}
                style={{ height: '90vh', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <LocationSelector onSelect={handleSelect} />

                {start && (
                    <Marker position={start}>
                        <Popup>Start</Popup>
                    </Marker>
                )}
                {end && (
                    <Marker position={end}>
                        <Popup>End</Popup>
                    </Marker>
                )}

                {route.length > 0 && (
                    <Polyline positions={route} color="blue" weight={5} />
                )}
            </MapContainer>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {start && end && (
                    <button onClick={getRoute}>Find Least Polluted Route</button>
                )}
                {aqi && (
                    <p style={{ marginTop: '10px' }}>
                        🌫️ Average AQI along route: <strong>{aqi}</strong>
                    </p>
                )}
            </div>
        </div>
    );
}
