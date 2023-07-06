import { useEffect, useState } from "react";

export const Hourly = ({hourlyWeather, weatherImages}) => {

    return (
        <div className="weather-container-hourly">
        {hourlyWeather.map((segment) => {

        // style={{ backgroundImage: `url(${segment.icon})` }}
        return (
            <div className={`weather-segment-hourly`} key={segment.endTime} >
                <div className="weather-info-hourly" style={{ backgroundImage: `linear-gradient(0deg, transparent, white)` }}>
                    <h5>{segment.startTime.slice(11,16)}</h5>
                    <h6>{segment.temperature} degrees</h6>
                    <p>{segment.shortForecast}.</p>
                    <p>{segment.relativeHumidity.value} percent humidity.</p>
                    <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                    <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                    <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p>
                </div>
            </div>
            )
        })}
    </div>
    )
}