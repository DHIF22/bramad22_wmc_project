import './App.css'
import LocationList from "./components/LocationList.tsx";
import AddLoc from "./components/AddLoc.tsx";
import {useEffect, useState} from "react";
import type {TLocation} from "./common/modules.ts";
import useCurrentLoc from "./hooks/useCurrentLoc.tsx";

function App() {

    const [shownLocations, setShownLocations] = useState<TLocation[]>([]);
    const [locations, setLocations] = useState<TLocation[]>([])


    const currentLoc = useCurrentLoc();

    useEffect(() => {
        if(currentLoc.name != "" && locations.length == 0){
            locations.push(currentLoc)
            setLocations([...locations]);
        }
    }, [currentLoc]);

    const removeLoc = (remLoc: TLocation) => {
        setLocations(locations.filter(loc => loc.name != remLoc.name));
        setShownLocations(shownLocations.filter(loc => loc.name != remLoc.name));
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"/>
            <AddLoc locations={locations} setLocations={setLocations} setShownLocations={setShownLocations}/>
            <LocationList locations={shownLocations} removeLoc={removeLoc}/>
        </>
    )
}

export default App