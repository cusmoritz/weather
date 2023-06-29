import { SearchBar } from "./components/SearchBar";
import { useEffect } from "react";
// import { locationCall } from "./api";

// console.log(module)
// import { locationCall } from './api'

const handleLocationLoad = async () => {
    console.log('hello now.');
    // await locationCall();
};


export const App = () => {

    useEffect(() => {
        handleLocationLoad()
    }, [])

    return (
        <div className="container">
            <h1>Weather</h1>
            <SearchBar />
        </div>
    )
}