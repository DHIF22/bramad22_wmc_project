import type {TLocation, TWeather} from "../common/modules.ts";
import {useEffect, useState} from "react";

function useWeather(loc: TLocation) {

    const [weather, setWeather] = useState<TWeather>(
        {
            current: {
                icon: "",
                description: "",
                temp: 0,
                wind: 0
            },
            today: {
                icon: "",
                description: "",
                maxTemp: 0,
                minTemp: 0,
                maxWind: 0,
                rain: 0
            },
            tomorrow: {
                icon: "",
                description: "",
                maxTemp: 0,
                minTemp: 0,
                maxWind: 0,
                rain: 0
            }
        }
    );

    useEffect(() => {
        getWeather(loc)
            .then(data => {

                setWeather(
                    {
                        current: {
                            icon: data.current.condition.icon,
                            description: data.current.condition.text,
                            temp: data.current.temp_c,
                            wind: data.current.wind_kph
                        },
                        today: {
                            icon: data.forecast.forecastday[0].day.condition.icon,
                            description: data.forecast.forecastday[0].day.condition.text,
                            maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
                            minTemp: data.forecast.forecastday[0].day.mintemp_c,
                            maxWind: data.forecast.forecastday[0].day.maxwind_kph,
                            rain: data.forecast.forecastday[0].day.daily_chance_of_rain
                        },
                        tomorrow: {
                            icon: data.forecast.forecastday[1].day.condition.icon,
                            description: data.forecast.forecastday[1].day.condition.text,
                            maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
                            minTemp: data.forecast.forecastday[1].day.mintemp_c,
                            maxWind: data.forecast.forecastday[1].day.maxwind_kph,
                            rain: data.forecast.forecastday[1].day.daily_chance_of_rain
                        }
                    }
                )
            })
            .catch(err => {
                console.error("ERROR: ", err);
            });
    }, []);

    return weather;
}


async function getWeather(loc: TLocation){

        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?days=4&key=5a0e1225caee4262bf1172220241605&lang=en&q=${loc.latitude},${loc.longitude}`);

        return await res.json();
}


export default useWeather;