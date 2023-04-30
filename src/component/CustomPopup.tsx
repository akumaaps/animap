import React, { createElement } from 'react';
import { useMap, Popup } from 'react-leaflet';
import { Animal } from './model/Animal';

interface CustomPopupProps {
    position: [number, number];
    changeAnimal: any;
    animals: Array<Animal>;
}
export const CustomPopup: React.FC<CustomPopupProps> = ({ position, changeAnimal, animals }: CustomPopupProps) => {
    const map = useMap();
    function onAnimalClick(animalId: number) {
        console.log("Changin to animal number " + animalId);
        changeAnimal(animalId);
        map.closePopup();
        return true;
    }

    var animalButtons: any = [];
    console.log(animals.toString());
    animals.forEach(animal => {
        var button = createElement("button", { onClick: () => { onAnimalClick(animal.id); } }, <img width={30} height={30} src={animal.icon} />);
        animalButtons.push(button);
    });

    return (
        <Popup position={position}>
            <div> {animalButtons}s</div>
        </Popup>

    );

};

export default CustomPopup;
