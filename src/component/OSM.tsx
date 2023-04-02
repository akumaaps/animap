

import React, { useEffect, useState }from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dog from '../resources/dog.png'
import cat from '../resources/cat.png'
import dino from '../resources/dino.png'
import bear from '../resources/bear.png'
import capybara from '../resources/capybara.png'

type GeoProps = {
    localisation: [number, number];
    // ...rest of your props
  }
const OSM: React.FC<GeoProps> = ({localisation})=> {  
    // Define your component props

    const animals = [
        {id: 1, animal: cat},
        {id: 2, animal: dog},
        {id: 3, animal: bear},
        {id: 4, animal: capybara},
        {id: 5, animal: dino}
        ];

        const state = {
            lat: 49.035617,
            lng: 3.060325,
            zoom: 13,
        }


    const Markers = () => {
        const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
        const map = useMap();

        
        var animalsId =  Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        console.log("random animal " + animalsId)
        var animal = animals[animalsId];

        var animalIcon = L.icon({
            iconUrl: animal.animal,
            iconSize:     [30, 30], // size of the icon
            iconAnchor:   [10, 15], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
            useEffect(() => {
            console.log("UseEffect OSM");

            map.locate().on("locationfound", (e)=> {
                setSelectedPosition([e.latlng.lat, e.latlng.lng]);
                map.flyTo(e.latlng, map.getZoom());
            });
            
            }, []);

            const mapevent = useMapEvents({
                click(e) {                                
                    setSelectedPosition([
                        e.latlng.lat,
                        e.latlng.lng
                    ]);                
                },            
            })

            return (
                selectedPosition ? 
                    <Marker           
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false}
                    icon={animalIcon}
                    />
                : null
            )   
        
    }

    return(
        <MapContainer 
            center={localisation} 
            zoom={state.zoom} 
            style={{ width: '100%', height: '900px'}}
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
