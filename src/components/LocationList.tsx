import React from 'react';
import type {TLocation} from "../common/modules.ts";
import Location from "./Location.tsx";

interface LocationListProps {
    locations: TLocation[];
}

const LocationList: React.FC<LocationListProps> = (Props) => {

    const {locations} = Props;

    return (
        <>
            <div>
                {locations.map((loc: TLocation, index: number) => (
                    <Location loc={loc} key={index}/>
                ))}
            </div>
        </>
    );
}

export default LocationList;