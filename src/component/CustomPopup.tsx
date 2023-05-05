import React from 'react';
import { Popup } from 'react-leaflet';
import { Animal } from './model/Animal';
import { LatLng } from 'leaflet';

interface CustomPopupProps {
    position: LatLng;
    changeAnimal: any;
    animals: Array<Animal>;
}
export const CustomPopup: React.FC<CustomPopupProps> = ({ position, changeAnimal, animals }: CustomPopupProps) => {

    function onAnimalClick(animalId: number) {
        console.log("Changin to animal number " + animalId);
        changeAnimal(animalId);
        return true;
    }

    var animalButtons: any = [];
    console.log(animals.toString());
    animals.forEach(animal => {
        if(animal.id !== 1) {
             animalButtons.push(<button onClick={() => { onAnimalClick(animal.id) }} > <img width={30} height={30} src={animal.icon}  alt={animal.name}/></button>);
        }

    });

    return (
        <Popup position={position} closeButton={false} >
            <div> {animalButtons}</div>
        </Popup>
    );
};

export default CustomPopup;
