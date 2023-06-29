import { SearchBar } from "./components/SearchBar";
import { useEffect } from "react";
const cors = require('cors');
console.log(module)
// import { locationGuess } from './api'

const SECRET = process.env;
console.log(process.env)

const handleLocationLoad = async () => {
    console.log('hello now.');
    // await locationCall();
};

const call = () => {fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${SECRET}`, { 
	method: "POST" ,
	body: { 
	} 
}) 
.then(resp => resp.json()) 
.then(resp => console.log('response, ', resp))
.catch(err => console.log("An error occured :" + err));
}
call(cors);
export const App = () => {

    useEffect(() => {
        call();
    }, [])

    return (
        <div>
            <h1>Weather</h1>
            <SearchBar />
        </div>
    )
}