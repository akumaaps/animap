

import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Markers } from './Markers';

type GeoProps = {
    localisation: [number, number];
    // ...rest of your props
}

const OSM: React.FC<GeoProps> = ({ localisation }) => {
    // Define your component props
    const state = {
        lat: 49.035617,
        lng: 3.060325,
        zoom: 13,
    }

    return (
        <MapContainer
            center={localisation}
            zoom={state.zoom}
            style={{ width: '100%', height: '900px' }}
        >
            <TileLayer
                attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers/>
        </MapContainer>
    )
}

export default OSM;
