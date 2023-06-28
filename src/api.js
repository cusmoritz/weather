const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

const googleApi = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCyNCdiUzLj0gRlIpQqLIvZPQF044TETjg";

// start the server
server.listen(3000, () => {
    console.log('server listening')

});

const locationCall = async() => {
    try {
        const locationGuess = await fetch(googleApi);
        console.log('location', locationGuess)
    } catch (error) {
        console.log('there was a problem making a location call')
    }
}


// server.post('/find', async (request, response, next) => {
//     try {
//         const useLocation = server.post(googleApi, async(request, response, next) => {
//             response.send();
//         })
//     } catch (error) {
//         console.log('there was an error finding your location');
//         throw error;
//     }
// })

// server.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCyNCdiUzLj0gRlIpQqLIvZPQF044TETjg', (request, response, next) => {
//     try {
//         console.log(response);
//     } catch (error) {
        
//     }
// })

module.exports = {
    locationCall,
}