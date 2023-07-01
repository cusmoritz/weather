import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { ReactDOM } from "react";

const SECRET = process.env.REACT_APP_GOOGLE_API;

// function that finds estimated coordinates for a device
const locationCall = async () => {
    try {
        const location = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${SECRET}`, {
            method: "POST",
        });
        const finding = await location.json();
        console.log('location,', finding);
        return finding;
    } catch (error) {
        throw error;
    }
};

const addressFromLatLong = async (lat, long) => {
    try {
        console.log('lat and long', lat, long)
        const response = await fetch(`${geocodeAPI}latlng=${lat},${long}&key=${SECRET}`, {
            method: "GET",
        });
        console.log('response', response)
        const address = await response.json();
        console.log('address: ', address);
        return address;
    } catch (error) {
        console.log('there was an error getting an address')
    }
};


export const App = () => {

    const [locationLoad, setLocationLoad] = useState([])

    useEffect(() => {
        locationCall().then(result => addressFromLatLong(result.location.lat, result.location.lng))
    }, [])

    return (
        <div className="container">
            <h1>Weather</h1>
            <SearchBar secret={SECRET} />
            <Footer />
        </div>
    )
}