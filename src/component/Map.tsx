
import { useEffect } from 'react';

import { useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import { LocationSearchingOutlined as LocateIcon } from '@mui/icons-material'
import {Button } from "@mui/material";

const LocateButton = () => {
    var map = useMap();

    function onclick() {
        map.locate().on("locationfound", (e) => {
            map.flyTo(e.latlng, 15);
        });
    }
    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            map.flyTo(e.latlng, 15);
        });
    }, []);

    return (
        <Button variant="contained" id="btn btn-primary" onClick={onclick}><LocateIcon className="Top-Icons" /></Button>
    )
}

export default LocateButton;