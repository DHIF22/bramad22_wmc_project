import React, {useEffect, useState} from 'react';
import type {TLocation} from "../common/modules.ts";
import useWeather from "../hooks/useWeather.tsx";

interface LocationProps{
    loc: TLocation;
    removeLoc: (loc: TLocation) => void;
}

const Location: React.FC<LocationProps> = (Props) => {

    const {loc, removeLoc} = Props;

    const [weatherFound, setWeatherFound] = useState<boolean>(false);

    const weather = useWeather(loc);

    useEffect(() => {

        if(weather.current.icon == ""){
            setWeatherFound(false);
        } else {
            setWeatherFound(true);
        }

    }, [weather]);

    return (
        <>
            {weatherFound && (
                <div id="weatherContainer">

                    <div id="weatherHeader">
                        <h2 id="locHeader">{loc.name}</h2>
                        <i id="delButton" className="bi bi-trash" onClick={() => removeLoc(loc)}/>
                    </div>

                    <div id="firstWeather">

                        <h3>Current</h3>

                        <div className="weatherText">
                            <p>Temperature
                                <br/>
                                <strong> {weather.current.temp} °C </strong>
                            </p>

                            <br/>

                            <p>Wind
                                <br/>
                                <strong> {weather.current.wind} km/h </strong>
                            </p>
                        </div>

                        <img src={weather.current.icon} className="weatherIcon" alt="Weather Icon"/>
                        <p className="weatherDescr">{weather.current.description}</p>

                    </div>

                    <div id="secondWeather">
                        <h3>Today</h3>

                        <div className="weatherText">
                            <p>Temperature
                                <br/>
                                <strong>{weather.today.maxTemp}°</strong>/{weather.today.minTemp}°
                            </p>

                            <br/>

                            <p>Max Wind
                                <br/>
                                <strong> {weather.today.maxWind} km/h </strong>
                            </p>

                            <br/>

                            <p>
                                <strong> {weather.today.rain}%</strong> rain
                            </p>
                        </div>

                        <img src={weather.today.icon} className="weatherIcon" alt="Weather Icon"/>
                        <p className="weatherDescr">{weather.today.description}</p>

                    </div>

                    <div id="thirdWeather">
                        <h3>Tomorrow</h3>

                        <div className="weatherText">
                            <p>Temperature
                                <br/>
                                <strong>{weather.tomorrow.maxTemp}°</strong>/{weather.tomorrow.minTemp}°
                            </p>

                            <br/>

                            <p>Max Wind
                                <br/>
                                <strong> {weather.tomorrow.maxWind} km/h </strong>
                            </p>

                            <br/>

                            <p>
                                <strong> {weather.tomorrow.rain}%</strong> rain
                            </p>
                        </div>

                        <img src={weather.tomorrow.icon} className="weatherIcon" alt="Weather Icon"/>
                        <p className="weatherDescr">{weather.tomorrow.description}</p>

                    </div>
                </div>
            )}
            <br/>
            <br/>
        </>

    );
}

export default Location;