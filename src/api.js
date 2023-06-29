const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

require('dotenv').config();

// this is to fix our fetch function
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// get our secret
const SECRET = process.env.SECRET;

// start the server
server.listen(3000, () => {
    console.log('server listening')

});

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

// geocoding is for going from an address => lat / long
// geocoding api:
// https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
// output format must be json

// https://developers.google.com/maps/documentation/geocoding/requests-geocoding#geocoding-lookup

// https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key=${googleApi}

const geocodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?";

const latLongFromAddress = async ({num, street, city, state, postal_code}) => {
    try {
        if (postal_code) {
            const postalCodeLatLong = await fetch(`${geocodeAPI}address=${postal_code}&key=${SECRET}`, {
                method: "GET",
            });
            const postalResponse = postalCodeLatLong.json();
            return postalResponse;
        } else {
            const address = await fetch(`${geocodeAPI}address=${num}%20${street}%20${city}%20${state}?key=${SECRET}`, {
                method: "GET",
            });
            const response = await address.json();
            console.log('response from address: ', response);
            return response;
        }

    } catch (error) {
        console.log('there was an error getting a latitude or longitude');
        throw error;
    }
};

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
// reverse goecoding is going from lat/long => address

const addressFromLatLong = async (lat, long) => {
    try {
        const response = await fetch(`${geocodeAPI}latlng=${lat},${long}&key=${SECRET}`, {
            method: "GET",
        });
        const address = await response.json();
        console.log('address: ', address);
        return address;
    } catch (error) {
        console.log('there was an error getting an address')
    }
}

locationCall().then(result => addressFromLatLong(result.location.lat, result.location.lng));

// to get the weather:
    // get the coordinates (from address or from load) => 
        // send those coordinates to 
        // https://api.weather.gov/points/${lat}%2C${long}
            // which returns 
            // properties.forecast: "https://api.weather.gov/gridpoints/BOU/61,99/forecast"
            // OR
            // properties.forcastHourly: "https://api.weather.gov/gridpoints/BOU/61,99/forecast/hourly"
        // ping those

