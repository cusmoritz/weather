import { useState, useEffect } from "react";

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

export const Standard = ({standardWeather, weatherImages}) => {

return (
    <div className="weather-container-standard">
        {standardWeather.map((segment) => {

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
            className={`weather-segment`} 
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
        })}
    </div>
    )
}