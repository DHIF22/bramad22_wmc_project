import React, {useEffect, useState} from 'react';
import type {TLocation} from "../common/modules.ts";

interface SearchProps {
    setShownLocations: (list: TLocation[]) => void;
    allLocations: TLocation[];
}


const AddLoc: React.FC<SearchProps> = (Props) => {

    const {setShownLocations, allLocations} = Props;
    const [currentValue, setCurrentValue] = useState<string>("");

    useEffect(() => {
        changeShown()
    }, [allLocations, currentValue]);

    const changeShown = () => {
        setShownLocations(
            allLocations.filter(loc => loc.name.toUpperCase().includes(currentValue.toUpperCase()))
        );
    }

    return (
        <>
            <div id="searchBarContainer">
                <i className="bi bi-search"></i>
                <input id="searchBar" onChange={(e) => setCurrentValue(e.target.value)}/>
            </div>
        </>
    );
}

export default AddLoc;