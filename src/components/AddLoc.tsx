import React, {useState} from 'react';
import type {TLocation} from "../common/modules.ts";
import Navbar from "./Navbar.tsx";
interface AddProps {
    locations: TLocation[];
    setLocations: (list: TLocation[]) => void;
    setShownLocations: (list: TLocation[]) => void;
}


const AddLoc: React.FC<AddProps> = (Props) => {

    const {locations, setLocations, setShownLocations} = Props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isNotFound, setisNotFound] = useState<boolean>(false);
    const [locationName, setLocationName] = useState<string>("");


    const addLoc = () => {
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
                    setisNotFound(false)
                    setIsOpen(false);
                } else {
                    setisNotFound(true);
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
            <Navbar setIsOpen={setIsOpen} setShownLocations={setShownLocations} allLocations={locations}/>
            <div>
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
                        <button onClick={addLoc} id="popup_button1">Hinzufügen</button>
                        <button
                        onClick={() => {
                            setIsOpen(false);
                            setisNotFound(false);
                        }}
                                id="popup_button2">Abbrechen
                        </button>

                        {isNotFound && (
                            <p id="errorMessage">Location not found!</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default AddLoc;