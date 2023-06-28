// const express = require('express');
// const cors = require('cors');

// const server = express();

// server.use(express.json());

// server.use(cors());

// const googleApi = "secret";

// // start the server
// server.listen(3000, () => {
//     console.log('server listening')

// });

// const locationCall = async() => {
//     try {
//         const locationGuess = await fetch(googleApi);
//         console.log('location', locationGuess)
//     } catch (error) {
//         console.log('there was a problem making a location call')
//     }
// }

// module.exports = {
//     locationCall,
// }