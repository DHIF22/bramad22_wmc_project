import React, {useEffect, useState} from 'react';
import type {TLocation} from "../common/modules.ts";
import Location from "./Location.tsx";

const LocationList: React.FC = () => {

    const [currentLoc, setCurrentLoc] = useState<TLocation>({
        name: "",
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        getCurrentLocation()
            .then(async pos => {
                const name = await getLocationName(pos.coords.latitude, pos.coords.longitude);
                setCurrentLoc({
                    name: name,
                    longitude: pos.coords.longitude,
                    latitude: pos.coords.latitude
                });
            })
            .catch(err => console.error("Fehler:", err));
    }, [])

    function getCurrentLocation(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation wird nicht unterstützt"));
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        });
    }

    async function getLocationName(lat: number, lon: number): Promise<string> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
        const response = await fetch(url, {
            headers: {
                "User-Agent": "MyWeatherApp/0.2 (bramad22@htl-kaindorf.at)"
            }
        });
        const data = await response.json();
        return data.display_name;
    }

    return (
        <>
            <Location loc={currentLoc}/>
        </>
    );
}

export default LocationList;