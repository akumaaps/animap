
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import { AnimalMarker } from './AnimalMarker';
import { LatLng } from 'leaflet';

const Markers = () => {
    // Define your component props
    const [markers, setMarkers] = useState<Array<LatLng>>(new Array<LatLng>());
    useMapEvents({
        click(e) {
            console.log("click to add markers");
            markers.push(e.latlng);
            var newMarkers = new Array<LatLng>()
            markers.forEach((marker) => newMarkers.push(marker));
            
            console.log(newMarkers);
            setMarkers(newMarkers);
        },
    });

    return (
        <div>
            {
                markers.map((latlng) => <AnimalMarker animalKey={`marker-${latlng.lat-latlng.lng}`} position={latlng} />
                )
            }
        </div>
    )
}

export default Markers;