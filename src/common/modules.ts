export type TLocation = {
    name: string,
    longitude: number,
    latitude: number
}

export type TWeather = {
    current: {
        icon: string,
        description: string
        temp: number,
        wind: number
    },
    today: {
        icon: string,
        description: string,
        maxTemp: number,
        minTemp: number,
        maxWind: number,
        rain: number
    },
    tomorrow: {
        icon: string,
        description: string,
        maxTemp: number,
        minTemp: number,
        maxWind: number,
        rain: number
    }
}