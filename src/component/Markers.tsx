import React, { useEffect, useState } from 'react';
import { Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import dog from '../resources/dog.png';
import cat from '../resources/cat.png';
import dino from '../resources/dino.png';
import bear from '../resources/bear.png';
import capybara from '../resources/capybara.png';
import { CustomPopup } from './CustomPopup';
import { Animal } from './OSM';

export const Markers = () => {
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
            map.flyTo(e.latlng, 15);
        });

    }, []);

    useMapEvents({
        click(e) {
            setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    var animalIcon = L.icon({
        iconUrl: animal.icon,
        iconSize: [30, 30],
        iconAnchor: [10, 15],
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
                    position={selectedPosition}
                    changeAnimal={setCurrentAnimalId}
                    animals={animals} />

            </Marker>
            : null
    );

};

export default Markers;