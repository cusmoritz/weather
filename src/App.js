import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { ReactDOM } from "react";

const SECRET = process.env.REACT_APP_GOOGLE_API;

// google api url
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

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

// function finds an address from a lat and long
const addressFromLatLong = async (lat, long) => {
    try {
        const response = await fetch(`${geocodeAPI}latlng=${lat},${long}&key=${SECRET}`, {
            method: "GET",
        });
        console.log('response', response)
        const address = await response.json();
        console.log('address: ', address.results[0].address_components[6].long_name);
        return address;
    } catch (error) {
        console.log('there was an error getting an address')
    }
};


export const App = () => {

    const [locationLoad, setLocationLoad] = useState([])

    useEffect(() => {
        // setLocationLoad(locationCall());
        addressFromLatLong("40.5523244", "-105.1142125")
    }, [])

    return (
        <div className="container">
            <h1>Weather</h1>
            <SearchBar secret={SECRET} />
            <Footer />
        </div>
    )
}