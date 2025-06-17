import React from 'react';
import Searchbar from "./Searchbar.tsx";
import type {TLocation} from "../common/modules.ts";

interface NavProps {
    setIsOpen: (stat: boolean) => void;
    setShownLocations: (locations: TLocation[]) => void;
    allLocations: TLocation[];
}


const AddLoc: React.FC<NavProps> = (Props) => {

    const {setIsOpen, setShownLocations, allLocations} = Props;

    return (
        <>
            <div id="navBar">
                <div id="innerNav">
                    <img src="/logo.png" alt="Logo" id="logo"/>
                    <h2 id="nameNav">Weather APP</h2>
                </div>
                <Searchbar setShownLocations={setShownLocations} allLocations={allLocations}/>
                <button onClick={() => setIsOpen(true)} id="addButton">Find Location</button>
            </div>

            <br/>
            <br/>
        </>
    );
}

export default AddLoc;