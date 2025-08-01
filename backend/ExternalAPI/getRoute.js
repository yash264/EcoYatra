const dotenv = require('dotenv')
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OPENROUTESERVICE_API_KEY = process.env.OPENROUTESERVICE_API_KEY;


const getRoute = async (start, end) => {
    const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
            coordinates: [start, end]
        },
        {
            headers: {
                Authorization: OPENROUTESERVICE_API_KEY,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
}

module.exports = { getRoute }