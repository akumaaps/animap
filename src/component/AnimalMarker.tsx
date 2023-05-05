import  { useState, useRef, useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import dog from '../resources/dog.png';
import cat from '../resources/cat.png';
import dino from '../resources/dino.png';
import bear from '../resources/bear.png';
import capybara from '../resources/capybara.png';
import tornado from '../resources/tornade.png';
import { CustomPopup } from './CustomPopup';
import { Animal } from './model/Animal';

interface MarkersProps {
    position: LatLng;
    animalKey: string;
}
export const AnimalMarker = ({position, animalKey}:MarkersProps) => {

    const [currentAnimalId, setCurrentAnimalId] = useState<number>(1);

    const animals: Array<Animal> = new Array<Animal>();

    const leafletRef = useRef<L.Marker>(null);
    
    initAnimals(animals);
    console.log("InitAnimal " + currentAnimalId)
    var animal = animals[currentAnimalId - 1];
    var animalIcon = L.icon({
        iconUrl: animal.icon,
        iconSize: [30, 30],
        iconAnchor: [10, 15],
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    
    useEffect(() => {
        leafletRef.current?.openPopup();
     
    }, []);

    useEffect(() => {
       if(currentAnimalId !== 1) {
        leafletRef.current?.closePopup();
       }
     
    }, [currentAnimalId]);

    useMapEvents({
        popupclose() {
            if(currentAnimalId === 1) {
                console.log("current animal id " + currentAnimalId)
                leafletRef.current?.remove();
            }
        }
    });

/**

        const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    useMapEvents({

        click(e) {
            setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
 */

    return (
        position ?
            <Marker
                ref={leafletRef}
                key={animalKey}
                position={position}
                interactive={true}
                icon={animalIcon}
            >

                <CustomPopup
                    position={position}
                    changeAnimal={setCurrentAnimalId}
                    animals={animals} />

            </Marker>
            : null
    );

};

export default AnimalMarker;

function initAnimals(animals: Animal[]) {
    animals.push({
        id: 1,
        icon: tornado,
        name:"Tornado"
    });
    animals.push({
        id: 2,
        icon: cat,
        name:"Cat"
    });
    animals.push({
        id: 3,
        icon: dog,
        name:"Dog"
    });
    animals.push({
        id: 4,
        icon: capybara,
        name:"Capybara"
    });
    animals.push({
        id: 5,
        icon: bear,
        name:"Bear"
    });
    animals.push({
        id: 6,
        icon: dino,
        name:"Dino"
    });
}
