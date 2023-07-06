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
        <div className="container">
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
            <div className="weather-container">
            {weatherType===true ? 
            standardWeather.map((segment) => {

                {/* "Chance Showers And Thunderstorms then Mostly Clear"
                "Slight Chance Showers And Thunderstorms then Partly Cloudy"
                "Partly Sunny then Chance Showers And Thunderstorms"
                "Chance Showers And Thunderstorms"
                "Slight Chance Rain Showers then Chance Showers And Thunderstorms"
                "Chance Showers And Thunderstorms then Mostly Cloudy"
                "Slight Chance Showers And Thunderstorms then Partly Cloudy"
                "Partly Sunny then Chance Showers And Thunderstorms"
                "Slight Chance Showers And Thunderstorms then Partly Cloudy" 
                Mostly Clear.
                */}

                // needs to be updated to leastFrequest -> most frequent so not repeating
                // same photos so often
                if(segment.shortForecast.includes("Chance Showers and Thunderstorms")) {
                    segment.icon=weatherImages.chanceShowers;
                } else if (segment.shortForecast.includes("Sunny")) {
                    segment.icon=weatherImages.sunny;
                } else if (segment.shortForecast.includes("Sunny")) {
                    segment.icon=weatherImages.sunny;
                } else if (segment.shortForecast.includes("Mostly Clear")) {
                    segment.icon=weatherImages.mostlyClear;
                } else if (segment.shortForecast.includes("Partly Sunny")) {
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
                    <div 
                        className={`weather-segment ${segment.temperature}`} 
                        key={segment.endTime} 
                        style={{ backgroundImage: `url(${segment.icon})` }}>
                            
                        <div className="weather-info"style={{backgroundImage: `linear-gradient(0deg, transparent, white)`}}>
                            <h5>{segment.name}: {segment.temperature} degrees</h5>
                            <p>{segment.shortForecast}.</p>
                            {/* <p>{segment.relativeHumidity.value} percent humidity.</p> */}
                            <p>{segment.probabilityOfPrecipitation.value} percent chance of precipitation.</p>
                            <p>Windspeed: {segment.windSpeed} from the {segment.windDirection}.</p>
                            {/* <p>Dewpoint: {Math.round(segment.dewpoint.value)} degrees Celcius.</p> */}
                        </div>

                    </div>
                )
            })
            : 
            hourlyWeather.map((segment) => {
                return (
                    <div className={`weather-segment ${segment.temperature}`} key={segment.endTime} style={{ backgroundImage: `url(${segment.icon})` }}>
                        <div className="weather-info hourly" style={{ backgroundImage: `linear-gradient(0deg, transparent, white)` }}>
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
    </div>
    )
};
