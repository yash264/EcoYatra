// src/Helpers/MapDisplay.js
import React, { useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    useMapEvents,
    useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Allow selecting points
const LocationSelector = ({ onSelect }) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng);
        },
    });
    return null;
};

// Helper to programmatically set map center
const SetMapCenter = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, 13); // Smooth pan to user location
        }
    }, [center, map]);

    return null;
};

const MapDisplay = ({ start, end, route, handleSelect, center }) => {
    const initialPosition = center || [28.6139, 77.2090]; // fallback to New Delhi

    const startIcon = new L.Icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    const endIcon = new L.Icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });


    return (
        <div className="border border-gray-300 rounded-md overflow-hidden shadow">
            <MapContainer
                center={initialPosition}
                zoom={13}
                className="h-[80vh] w-full rounded border border-gray-400 shadow-md z-0"
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <SetMapCenter center={center} />
                <LocationSelector onSelect={handleSelect} />

                {start && (
                    <Marker position={start} icon={startIcon}>
                        <Popup>Start</Popup>
                    </Marker>
                )}
                {end && (
                    <Marker position={end} icon={endIcon}>
                        <Popup>End</Popup>
                    </Marker>
                )}
                {route.length > 0 && (
                    <Polyline positions={route} color="blue" weight={5} />
                )}
            </MapContainer>
        </div>
    );
};

export default MapDisplay;
