import { useState, useEffect } from "react";

export const Weather = ({hourlyWeather, standardWeather}) => {
    console.log('standard: ', standardWeather)
    return (
        <div className="weather-container">
            <span>Daily</span><span>Hourly</span>
            {standardWeather.map((segment) => {
                return (
                    <div className="weather-segment" key={segment.endTime}>
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
