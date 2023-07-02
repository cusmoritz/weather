import { useState, useEffect } from "react";
import lightRain from '../images/light-rain.jpeg';
import heavyRain from '../images/heavy_rain.jpeg'

export const Weather = ({hourlyWeather, standardWeather}) => {
    console.log('standard: ', standardWeather)
    console.log('hourly: ', hourlyWeather)

    const [weatherType, setWeatherType] = useState(true);

    const handleWeatherSwitch = () => {
        setWeatherType(!weatherType)
    }

    // useEffect(() => {
    //     setWeatherType(standardWeather)
    // }, [])

    return (
        <div className="weather-container">
            <div className="switcher">
                <button onClick={event => (event.preventDefault(), handleWeatherSwitch())} className="weather-switch">
                    Daily
                </button>
                <button onClick={event => (event.preventDefault(), handleWeatherSwitch())} className="weather-switch">
                    Hourly
                </button>
            </div>
            {weatherType===true ? 
            standardWeather.map((segment) => {
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} >
                        {/* "https://api.weather.gov/icons/land/day/tsra_hi,30?size=medium"
                        "https://api.weather.gov/icons/land/day/few?size=medium"
                        "https://api.weather.gov/icons/land/day/bkn/tsra_sct,50?size=medium"
                        "https://api.weather.gov/icons/land/night/tsra_sct,50/tsra_sct,40?size=medium" */}
                        <img className="weather-icon" src={segment.icon}/>
                        <div className="centered">
                            <h5>{segment.name}: {segment.temperature} degrees</h5>
                            <p>{segment.shortForecast}.</p>
                            <p>{segment.relativeHumidity.value} percent humidity.</p>
                            <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                            <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                            <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p>
                        </div>

                    </div>
                )
            })
            : 
            hourlyWeather.map((segment) => {
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} >
                        <img className="weather-icon" src={segment.icon}/>
                        <h5>{segment.startTime}: {segment.temperature} degrees</h5>
                        <p>{segment.shortForecast}.</p>
                        <p>{segment.relativeHumidity.value} percent humidity.</p>
                        <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                        <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                        <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p>
                    </div>
                )
            })
            
            }
            
        </div>
    )
};
