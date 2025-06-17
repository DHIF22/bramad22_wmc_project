import './App.css'
import LocationList from "./components/LocationList.tsx";
import AddLoc from "./components/AddLoc.tsx";
import {useEffect, useState} from "react";
import type {TLocation} from "./common/modules.ts";
import useCurrentLoc from "./hooks/useCurrentLoc.tsx";

function App() {

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
    }

    return (
    <>
        <AddLoc locations={locations} setLocations={setLocations}/>
        <LocationList locations={locations} removeLoc={removeLoc}/>
    </>
  )
}

export default App