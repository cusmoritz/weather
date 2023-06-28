import { SearchBar } from "./components/SearchBar";
import { useEffect } from "react";
import { locationCall } from './api'

const handleLocationLoad = async () => {
    console.log('hello now.');
    await locationCall();
};

export const App = () => {

    useEffect(() => {
        handleLocationLoad();
    }, [])

    return (
        <div>
            <h1>Weather</h1>
            <SearchBar />
        </div>
    )
}