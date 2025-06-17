import React from 'react';
import type {TLocation} from "../common/modules.ts";
import Location from "./Location.tsx";

interface LocationListProps {
    locations: TLocation[];
    removeLoc: (loc: TLocation) => void;
}

const LocationList: React.FC<LocationListProps> = (Props) => {

    const {locations, removeLoc} = Props;

    return (
        <>
            <div id="allLocations">
                {locations.map((loc: TLocation, index: number) => (
                    <Location loc={loc} key={index} removeLoc={removeLoc}/>
                ))}
            </div>
        </>
    );
}

export default LocationList;