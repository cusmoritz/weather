import { useState, useEffect } from "react";

export const SearchBar = ({secret}) => {
    
    const [search, setSearch] = useState("");
    
    const fetchAddress = async () => {
        try {
            const resp = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${secret}`, {
                method: "POST"
            });
            const latLong = await resp.json();
            console.log(latLong);
        } catch (error) {
            console.log('there was an error fetching that address.')
            throw error;
        }
    }

    return (
        <div>
            <label htmlFor="search-bar">Search for an address or postal code.</label>
            <input 
                type="search"
                className="search-bar"
                placeholder="Search" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)}>
            </input>
            <button type="submit" onClick={fetchAddress}>Search</button>
            {!search ? null : (
                <div className="search-results">

                </div>
            )}
        </div>
    )
};