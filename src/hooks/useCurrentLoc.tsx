import { useEffect, useState } from "react";
import type { TLocation } from "../common/modules.ts";

function useCurrentLocation(): TLocation {
    const [currentLoc, setCurrentLoc] = useState<TLocation>({
        name: "",
        longitude: 0,
        latitude: 0
    });

    useEffect(() => {
        getCurrentLocation()
            .then(async pos => {
                const name = await getLocationName(pos.coords.latitude, pos.coords.longitude);
                setCurrentLoc({
                    name: name,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            })
            .catch(err => {
                console.error("Fehler:", err);
            });
    }, []);

    return currentLoc;
}

function getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation wird nicht unterstützt"));
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    });
}

async function getLocationName(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const response = await fetch(url, {
        headers: {
            "User-Agent": "MyWeatherApp/0.2 (bramad22@htl-kaindorf.at)"
        }
    });
    const data = await response.json();
    return data.display_name;
}

export default useCurrentLocation;