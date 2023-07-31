import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { ReactDOM } from "react";
import { LoadGuess } from "./components/LoadGuess";
import { Weather } from "./components/Weather";

const SECRET = process.env.REACT_APP_GOOGLE_API;

const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

const weatherCoordsPath = "https://api.weather.gov/points/"; 

// we find the location on load
    // then we ask if they want to use that address
        // if not, they can search for an address
            // address search (or postal) => google api for coords => weather.gov api for weather

export const App = () => {

    // this state is for storing the auto-finding coordinate function
    const [loadCoords, setLoadCoords] = useState({});

    // state keeps estimated postal code for reference later
    const [postalLoad, setPostalLoad] = useState("");

    // state for normal weather, tonight, tomorrow, etc
    const [standardWeather, setStandardWeather] = useState({});

    // state for hourly weather response
    const [hourlyWeather, setHourlyWeather] = useState({});

    // this state is reserved for after you search for an address and get the coords from google
    const [searchCoords, setSearchCoords] = useState({});

    const [coordsFromAddressSearch, setCoordsFromAddressSearch] = useState({});


    // const Loading = () => {
    //     return (
    //         <div className="loading">
    //             <h3>Loading ...</h3>
    //         </div>
    //     )
    // }

    // No. 1
    // function that finds estimated coordinates for a device
    const locationCall = async () => {
        try {
            const location = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${SECRET}`, {
                method: "POST",
            });
            const finding = await location.json();

            // obj: lat, lng
            setLoadCoords(finding.location)
            return finding.location;
        } catch (error) {
            console.log('there was an error in locationCall')
            throw error;
        }
    };

    // No. 2
    // function finds an address from a lat and lng
    const addressFromLatLong = async (lat, lng) => {
        try {
            const response = await fetch(`${geocodeAPI}latlng=${lat},${lng}&key=${SECRET}`, {
                method: "GET",
            });

            const address = await response.json();

            console.log('YOLO', address.results[0].address_components[address.results[0].address_components.length - 1].long_name)

            // sets the postal code to state for reference later
            setPostalLoad(address.results[0].address_components[address.results[0].address_components.length - 1].long_name)
            return address.results[0].address_components[6].long_name;
        } catch (error) {
            console.log('there was an error getting an address')
        }
    };

    useEffect(() => {
        locationCall().then(results => addressFromLatLong(results.lat, results.lng))
    }, [])

    // function that finds the weather for a given lat and long
    const findWeather = async (lat, lng) => {

        try {
            const response = await fetch(`${weatherCoordsPath}${lat}%2C${lng}`, {
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

    const weatherHelperFunction = async () => {
        try {
            
        } catch (error) {
            console.log('there was a proglem with the weather helper function')
        }
    }

    return (
        <div className="container">
            <h1>Chance of Rain</h1>
            <p>{loadCoords.lat}, {loadCoords.lng}</p>
            {!postalLoad ? console.log("Nope") : <form onSubmit={(e) => {e.preventDefault(); findWeather(loadCoords.lat, loadCoords.lng)}}><p>Looks like you are near {postalLoad}. <button type="submit" >Use that?</button></p></form>}
            <SearchBar secret={SECRET} setSearchCoords={setSearchCoords} findWeather={findWeather}/>
            <hr />
            {(Object.keys(standardWeather).length === 0 && Object.keys(hourlyWeather).length === 0) ? null : <Weather hourlyWeather={hourlyWeather} standardWeather={standardWeather}/>}
            <Footer />
        </div>
    )
}