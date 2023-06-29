console.log('api', module)

const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

const googleApi = "secret";

// start the server
server.listen(3000, () => {
    console.log('server listening')

});

const locationGuess = async() => {
    try {
        const guess = await fetch(googleApi);
        console.log('location', guess)
    } catch (error) {
        console.log('there was a problem making a location call')
    }
};

module.exports = {
    locationGuess,
}