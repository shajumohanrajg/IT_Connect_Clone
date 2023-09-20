import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const OpenStreetMap = ({ latitude, longitude }) => {
    const position = [latitude, longitude];

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Latitude: {latitude}, Longitude: {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default OpenStreetMap;
