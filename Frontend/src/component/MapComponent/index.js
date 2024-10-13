import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ lat, lon, diachi, phuong }) => {
    const defaultLat = 10.762622; // Ví dụ: tọa độ của TP.HCM
    const defaultLon = 106.660172;

    const hasLocationData = lat && lon && phuong;

    return (
        <MapContainer
            key={`${lat}-${lon}`}
            center={[lat || defaultLat, lon || defaultLon]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hasLocationData && (
                <Marker position={[lat, lon]}>
                    <Popup>
                        <b>{phuong}</b><br />{diachi}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
