import { useState, useEffect } from "react";
const cors = require('cors');

export const SearchBar = ({secret}) => {
    
    const [search, setSearch] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [houseNum, setHouseNum] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

    // const handleAddressSearch = (event) => {
    //     event.preventDefault();
    //     addressFromSearch();
    // }

    const addressFromSearch = async() => {

        try {
                const streetURI = encodeURI(street);
                console.log('No zip code.')
                const address = await fetch(`${geocodeAPI}address=${houseNum}%20${streetURI}%20${city}%20${state}&key=${secret}`, {
                    method: "GET",
                });
                const response = await address.json();
                console.log('response from address: ', response.results[0]);
                setSearchResults(response.results[0])
                return response.results;
        } catch (error) {
            console.log('there was an error searching for that address');
            throw error;
        }
    };


    // Place Autocomplete API url
    // https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us&key={secret}

    // DOES NOT WORK CLIENT SIDE????
    const autosearchAPI = "https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us"
    const weatherFromPostal = async() => {
        try {
            console.log('We got a zip code.')
            const postalLatLng = await fetch(`${autosearchAPI}&input=${postalCode}&types=geocode&key=${secret}`, cors(), {
                method: "GET",
                // headers: {
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Methods': 'GET',
                    // "Access-Control-Allow-Origin": "https://maps.googleapis.com/maps/api/place/autocomplete/",
                // }
            });
            const postalCodeLatLng = await postalLatLng.json();
            console.log('code response: ', postalCodeLatLng)
            return postalCodeLatLng;
        } catch (error) {
            console.log('there was an error getting the weather from that postal code');
            throw error;
        }
    }
    
    // const fetchAddress = async () => {
    //     try {
    //         const resp = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${secret}`, {
    //             method: "POST"
    //         });
    //         const latLong = await resp.json();
    //         console.log(latLong);
    //     } catch (error) {
    //         console.log('there was an error fetching that address.')
    //         throw error;
    //     }
    // }

    return (
        <div>
            <label htmlFor="search-bar">Search for an address ...</label>
            <form className="search-bar" onSubmit={(e) => (e.preventDefault(), addressFromSearch())}>
            <input 
                type="number"
                required
                className="search-box"
                placeholder="House number (required)" 
                value={houseNum} 
                onChange={(event) => setHouseNum(event.target.value)}>
            </input>
            <input 
                type="text"
                required
                className="search-box"
                placeholder="Street (required)" 
                value={street} 
                onChange={(event) => setStreet(event.target.value)}>
            </input>
            <input 
                type="text"
                required
                className="search-box"
                placeholder="City (required)" 
                value={city} 
                onChange={(event) => setCity(event.target.value)}>
            </input>
            <input 
                type="text"
                required
                className="search-box"
                placeholder="State (required)" 
                value={state} 
                onChange={(event) => setState(event.target.value)}>
            </input>
            <button type="submit">Search</button>
            </form>

            {search.length < 1 ? null : (
                <div className="search-results">
                    {searchResults.map((address) => {
                        console.log(address)
                        return (
                            <p key={address.place_id}>Did you mean: <button>{address.formatted_address}</button></p>
                        )
                    })}
                </div>
            )}
            <label htmlFor="postal-bar">... or a postal code.</label>
            <input 
                type="search"
                className="postal-bar"
                placeholder="Postal code" 
                value={postalCode} 
                onChange={(event) => setPostalCode(event.target.value)}>
            </input>
            <button type="submit" onClick={weatherFromPostal}>Search</button>
        </div>
    )
};