import { useState, useEffect } from "react";

export const SearchBar = () => {
    
    const [search, setSearch] = useState("");
    
    const handleSearch = () => {
        console.log(search)
        // make an api call for locations
    }

    return (
        <div className="search">
            <label htmlFor="search-bar">Search for an address or zip code.</label>
            <input 
                className="search-bar"
                placeholder="Search" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)}>
            </input>
            <button type="submit" onClick={handleSearch}>Search</button>
            {!search ? null : (
                <div className="search-results">

                </div>
            )}
        </div>
    )
};