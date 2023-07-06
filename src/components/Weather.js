import { useState, useEffect } from "react";
import lightRain from '../images/light-rain.jpeg';
import heavyRain from '../images/heavy_rain.jpeg'
import sunny from '../images/sunny.jpeg'
import chanceOfRain from '../images/chance_of_rain.jpeg'
import partlyCloudy from '../images/partlyCloudy.jpeg'
import thunderstorms from '../images/thunderstorms.jpeg'
import mostlyClear from '../images/mostlyClear.jpeg'
import mostlyCloudy from '../images/mostlyCloudy.jpeg'
import chanceShowers from '../images/chanceShowers.jpeg'

import { Hourly } from "./Hourly";
import { Standard } from "./Standard";

export const Weather = ({hourlyWeather, standardWeather}) => {
    console.log('standard: ', standardWeather)
    console.log('hourly: ', hourlyWeather)

    const weatherImages = {
        sunny,
        lightRain,
        heavyRain,
        chanceOfRain,
        partlyCloudy,
        thunderstorms,
        mostlyClear,
        mostlyCloudy,
        chanceShowers,
    }

    const [weatherType, setWeatherType] = useState(true);

    const handleWeatherSwitch = () => {
        setWeatherType(!weatherType)
    }

    // useEffect(() => {
    //     setWeatherType(standardWeather)
    // }, [])

    return (
        <div className="component-container">
            <div className="switcher">
                {weatherType==true 
                ?                 
                <button 
                    onClick={event => (event.preventDefault(), handleWeatherSwitch())} className="weather-switch">
                    Switch to Hourly
                </button> 
                :                 
                <button 
                    onClick={event => (event.preventDefault(), handleWeatherSwitch())} className="weather-switch">
                    Switch to Daily
                </button>}
            </div>

            {/* weather-container needs these css elements:
            
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;

            to stack the way we want them */}

            {weatherType ? 

            // return standard weather
            <Standard standardWeather={standardWeather} weatherImages={weatherImages}/>
            : 
            <Hourly hourlyWeather={hourlyWeather} weatherImages={weatherImages}/>
            
            }  
        </div>
    )
};
