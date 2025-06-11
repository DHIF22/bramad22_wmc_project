import React from 'react';
import type {TLocation} from "../common/modules.ts";

interface LocationProps{
    loc: TLocation;
}

const Location: React.FC<LocationProps> = (Props) => {

    const {loc} = Props;

    return (
        <>
            <p>Name: {loc.name}</p>
            <hr/>
        </>
    );
}

export default Location;