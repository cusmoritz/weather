import { useState, useEffect } from "react";

export const SearchBar = () => {
    
    const [search, setSearch] = useState("");
    
    const handleSearch = () => {
        console.log(search)
    }

    return (
        <div className="search">
            <input 
                placeholder="Search" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)}>
            </input>
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>
    )
}