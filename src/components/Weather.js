import { useState, useEffect } from "react";
import lightRain from '../images/light-rain.jpeg';
import heavyRain from '../images/heavy_rain.jpeg'

export const Weather = ({hourlyWeather, standardWeather}) => {
    console.log('standard: ', standardWeather)
    console.log('hourly: ', hourlyWeather)
    return (
        <div className="weather-container">
            <span>Daily</span><span>Hourly</span>
            {standardWeather.map((segment) => {
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} >
                        <h5>{segment.name}: {segment.temperature} degrees</h5>
                        <p>{segment.shortForecast}.</p>
                        <p>{segment.relativeHumidity.value} percent humidity.</p>
                        <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                        <img src={segment.icon}/>
                        <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                        <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p>
                    </div>
                )
            })}
        </div>
    )
};
