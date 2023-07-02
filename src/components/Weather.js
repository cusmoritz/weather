import { useState, useEffect } from "react";
import lightRain from '../images/light-rain.jpeg';
import heavyRain from '../images/heavy_rain.jpeg'
import sunny from '../images/sunny.jpeg'
import chanceOfRain from '../images/chance_of_rain.jpeg'
import partlyCloudy from '../images/partlyCloudy.jpeg'
import thunderstorms from '../images/thunderstorms.jpeg'
import mostlyClear from '../images/mostlyClear.jpeg'
import mostlyCloudy from '../images/mostlyCloudy.jpeg'

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

    }

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
            {/* "Chance Showers And Thunderstorms then Mostly Clear"
            "Slight Chance Showers And Thunderstorms then Partly Cloudy"
            "Partly Sunny then Chance Showers And Thunderstorms"
            "Chance Showers And Thunderstorms"
            "Slight Chance Rain Showers then Chance Showers And Thunderstorms"
            "Chance Showers And Thunderstorms then Mostly Cloudy"
            "Slight Chance Showers And Thunderstorms then Partly Cloudy"
            "Partly Sunny then Chance Showers And Thunderstorms"
            "Slight Chance Showers And Thunderstorms then Partly Cloudy" */}
            
            {weatherType===true ? 
            standardWeather.map((segment) => {
                if(segment.shortForecast.includes("Chance Showers And Thunderstorms")) {
                    segment.icon=weatherImages.chanceOfRain
                } else if (segment.shortForecast.includes("Sunny")) {
                    segment.icon=weatherImages.sunny
                } else if (segment.shortForecast.includes("Partly Sunny" || "Mostly Clear")) {
                    segment.icon=weatherImages.partlyCloudy
                } else if (segment.shortForecast.includes("Thunderstorms")) {
                    segment.icon=weatherImages.thunderstorms
                } else if (segment.shortForecast.includes("Chance Showers And Thunderstorms")) {
                    segment.icon=weatherImages.mostlyCloudy
                }

                if (segment.probabilityOfPrecipitation.value == null){
                    segment.probabilityOfPrecipitation.value = 0;
                }
                // `url(${segment.icon})`
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} style={{
                        backgroundImage: `url(${segment.icon})`
                      }}>
                        {/* "https://api.weather.gov/icons/land/day/tsra_hi,30?size=medium"
                        "https://api.weather.gov/icons/land/day/few?size=medium"
                        "https://api.weather.gov/icons/land/day/bkn/tsra_sct,50?size=medium"
                        "https://api.weather.gov/icons/land/night/tsra_sct,50/tsra_sct,40?size=medium" */}
                        {/* <img className="weather-icon" src={segment.icon}/> */}
                        <div className="weather-info"style={{backgroundImage: `linear-gradient(0deg, transparent, white)`}}>
                            <h5>{segment.name}: {segment.temperature} degrees</h5>
                            <p>{segment.shortForecast}.</p>
                            {/* <p>{segment.relativeHumidity.value} percent humidity.</p> */}
                            <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                            <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                            {/* <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p> */}
                        </div>

                    </div>
                )
            })
            : 
            hourlyWeather.map((segment) => {
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} style={{ backgroundImage: `url(${segment.icon})` }}>
                        <div className="weather-info"style={{backgroundImage: `linear-gradient(0deg, transparent, white)`}}>
                            <h5>{segment.startTime.slice(11,16)} : {segment.temperature} degrees</h5>
                            <p>{segment.shortForecast}.</p>
                            <p>{segment.relativeHumidity.value} percent humidity.</p>
                            <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                            <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}</p>
                            <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p>
                        </div>
                    </div>
                )
            })
            
            }
        </div>
    )
};
