

import React, { createElement, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet'
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

type Animal = {
    id: number;
    icon: string;
    // ...rest of your props
}

interface CustomPopupProps {
    position:[number, number],
    changeAnimal: any,
    animals: Array<Animal>
}
const CustomPopup: React.FC<CustomPopupProps> = ({position, changeAnimal, animals}:CustomPopupProps) => {
    const map = useMap();
    function onAnimalClick(animalId: number) {
        console.log("Changin to animal number " + animalId)
        changeAnimal(animalId);
        map.closePopup();
        return true;
    }

    var animalButtons: any = [];
    console.log(animals.toString());
    animals.forEach(animal => {
        var button = createElement("button", { onClick: () => { onAnimalClick(animal.id) } }, <img width={30} height={30} src={animal.icon} />)
        animalButtons.push(button);
    })

    return (
        <Popup position={position}>
            <div> {animalButtons}s</div>
        </Popup>

    );

}
const Markers = () => {
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [currentAnimalId, setCurrentAnimalId] = useState<number>(1);

    const animals: Array<Animal> = new Array<Animal>();  
    animals.push({
        id: 1,
        icon: cat
    });  
    animals.push({
        id: 2,
        icon: dog
    });
    animals.push({
        id: 3,
        icon: capybara
    });
    animals.push({
        id: 4,
        icon: bear
    });
    animals.push({
        id: 5,
        icon: dino
    });


    // Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    //console.log("random animal " + animalsId)
    var animal = animals[currentAnimalId - 1];
    const map = useMap();


    useEffect(() => {
        console.log("UseEffect OSM");
        map.locate().on("locationfound", (e) => {
            setSelectedPosition([e.latlng.lat, e.latlng.lng]);
            map.flyTo(e.latlng,15);
        });

    },[]);

    useMapEvents({
        click(e) {
            setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        },
    })

    var animalIcon = L.icon({
        iconUrl: animal.icon,
        iconSize: [30, 30], // size of the icon
        iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    return (
        selectedPosition ?
            <Marker
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={true}
                icon={animalIcon}
            >

                <CustomPopup
                    position= {selectedPosition}
                    changeAnimal={setCurrentAnimalId}
                    animals={animals}/>
            
            </Marker>
            : null
    )

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
