import React, {useState} from 'react';
import type {TLocation} from "../common/modules.ts";
import Navbar from "./Navbar.tsx";
interface AddProps {
    locations: TLocation[];
    setLocations: (list: TLocation[]) => void;
}


const AddLoc: React.FC<AddProps> = (Props) => {

    const {locations, setLocations} = Props;

    const [isOpen, setIsOpen] = useState(false);
    const [locationName, setLocationName] = useState("");


    const addLoc = () => {
        setIsOpen(false);
        addNewLoc();
    };

    function addNewLoc(){

        getCoordsFromLocationName(locationName)
            .then(data => {
                if(data[0] != undefined) {
                    locations.push({
                        name: data[0].display_name,
                        longitude: data[0].lon,
                        latitude: data[0].lat
                    });
                    setLocations([...locations]);
                } else {
                    console.error("NO LOCATION FOUND");
                }
            })
            .catch(err => console.error("ERROR: ", err));


    }

    async function getCoordsFromLocationName(name: string){
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`
        const res = await fetch(url, {
            headers: {
                "User-Agent": "MyWeatherApp/0.3 (bramad22@htl-kaindorf.at)"
            }
        });

        return await res.json();
    }

    return (
        <>
            <div>
                <Navbar setIsOpen={setIsOpen}/>

                {isOpen && (
                    <div id="popup_window">
                        <h2 id="popup_h2">Ort hinzufügen</h2>
                        <input
                            type="text"
                            value={locationName}
                            placeholder="Stadt, Land"
                            id="popup_input"
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <button onClick={addLoc} id="popup_button1"
                        >Hinzufügen</button>
                        <button onClick={() => setIsOpen(false)} id="popup_button2">Abbrechen</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddLoc;