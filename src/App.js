import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { ReactDOM } from "react";
import { LoadGuess } from "./components/LoadGuess";

const SECRET = process.env.REACT_APP_GOOGLE_API;

const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

export const App = () => {

    const [locationLoad, setLocationLoad] = useState({});
    const [postalLoad, setPostalLoad] = useState("");

    // function that finds estimated coordinates for a device
    const locationCall = async () => {
        try {
            const location = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${SECRET}`, {
                method: "POST",
            });
            const finding = await location.json();
            console.log('coords,', finding);
            setLocationLoad(finding.location)
            return finding.location;
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
            // console.log('response', response)
            const address = await response.json();
            console.log('address: ', address.results[0].address_components[6].long_name);
            setPostalLoad(address.results[0].address_components[6].long_name)
            return address.results[0].address_components[6].long_name;
        } catch (error) {
            console.log('there was an error getting an address')
        }
    };

    useEffect(() => {
        locationCall().then(results => addressFromLatLong(results.lat, results.lng))

    }, [])

    return (
        <div className="container">
            <h1>Weather</h1>
            <p>{locationLoad.lat}, {locationLoad.lng}</p>
            {!postalLoad ? console.log("Nope") : <p>Looks like you are near the {postalLoad} postal code. Use that?</p>}
            <SearchBar secret={SECRET} />
            <Footer />
        </div>
    )
}