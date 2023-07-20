import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { ReactDOM } from "react";
import { LoadGuess } from "./components/LoadGuess";
import { Weather } from "./components/Weather";
import { setLoading } from "./components/Loading";

const SECRET = process.env.REACT_APP_GOOGLE_API;

const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

const weatherCoordsPath = "https://api.weather.gov/points/"; 

export const App = () => {

    // FALSE = loading not active
    const [loading, setLoading] = useState(false)
    const [locationLoad, setLocationLoad] = useState({});
    const [postalLoad, setPostalLoad] = useState("");
    const [standardWeather, setStandardWeather] = useState({});
    const [hourlyWeather, setHourlyWeather] = useState({});
    const [coordsFromAddressSearch, setCoordsFromAddressSearch] = useState({});


    const Loading = () => {
        return (
            <div className="loading">
                <h3>Loading ...</h3>
            </div>
        )
    }

    // function that finds estimated coordinates for a device
    const locationCall = async () => {
        try {
            const location = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${SECRET}`, {
                method: "POST",
            });
            const finding = await location.json();
            console.log('coords,', finding.location);
            setLocationLoad(finding.location)
            return finding.location;
        } catch (error) {
            console.log('there was an error in locationCall')
            throw error;
        }
    };

    // function finds an address from a lat and long
    const addressFromLatLong = async (lat, long) => {
        try {
            const response = await fetch(`${geocodeAPI}latlng=${lat},${long}&key=${SECRET}`, {
                method: "GET",
            });

            const address = await response.json();

            console.log('YOLO', address.results[0].address_components[5].long_name)

            setPostalLoad(address.results[0].address_components[5].long_name)
            return address.results[0].address_components[6].long_name;
        } catch (error) {
            console.log('there was an error getting an address')
        }
    };

    useEffect(() => {
        locationCall().then(results => addressFromLatLong(results.lat, results.lng))
    }, [])

    const confirmPostal = async () => {

        try {
            const response = await fetch(`${weatherCoordsPath}${locationLoad.lat}%2C${locationLoad.lng}`, {
                method: "GET",
            });
            const weather = await response.json();

            // returns weather array for up to 100 hours in the future
            const hourlyForcastAPI = weather.properties.forecastHourly;

            // returns weather array for Sunday, Sunday Night, Monday, Monday Night... etc
            const forcastAPI = weather.properties.forecast;

            const hourlyForcast = await fetch(`${hourlyForcastAPI}`, {
                method: "GET",
            });
            const forcast = await fetch(`${forcastAPI}`, {
                method: "GET",
            });
    
            // returns weather array for up to 100 hours in the future
            const hourly = await hourlyForcast.json();
            const daily = await forcast.json();
            setHourlyWeather(hourly.properties.periods);
            setStandardWeather(daily.properties.periods);

            // console.log('weather response: ', daily.properties.periods);
            return {hourly: hourly.properties.periods, standard: daily.properties.periods};
        } catch (error) {
            console.log('there was an error getting the weather for that postal code.');
            throw error;
        }
    };

    return (
        <div className="container">
            <h1>Chance of Rain</h1>
            <p>{locationLoad.lat}, {locationLoad.lng}</p>
            {!postalLoad ? console.log("Nope") : <p>Looks like you are near {postalLoad}. <button onClick={confirmPostal}>Use that?</button></p>}
            <SearchBar secret={SECRET} setLoading={setLoading} setLocationLoad={setLocationLoad} confirmPostal={confirmPostal}/>
            <hr />
            {(Object.keys(standardWeather).length === 0 && Object.keys(hourlyWeather).length === 0) ? null : <Weather hourlyWeather={hourlyWeather} standardWeather={standardWeather}/>}
            <Footer />
        </div>
    )
}