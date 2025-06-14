import React, {useState} from 'react';
import type {TLocation} from "../common/modules.ts";
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
                <button onClick={() => setIsOpen(true)}>Find Location</button>

                {isOpen && (
                    <div id="popup_window">
                        <h2>Ort hinzufügen</h2>
                        <input
                            type="text"
                            value={locationName}
                            placeholder="Stadt, Land"
                            id="locationNameInput"
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <br />
                        <button onClick={addLoc}
                        >Hinzufügen</button>
                        <button onClick={() => setIsOpen(false)}>Abbrechen</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddLoc;