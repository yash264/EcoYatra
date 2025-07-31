const dotenv = require('dotenv')
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OPENROUTESERVICE_API_KEY = process.env.OPENROUTESERVICE_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;


// Get route between two points
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


// Safe threshold values based on CPCB or EPA
const thresholds = {
    co: 1000,      // in µg/m³
    no: 40,        // µg/m³
    no2: 80,
    o3: 100,
    so2: 80,
    pm2_5: 60,
    pm10: 100,
    nh3: 400
};

function normalizePollutant(value, threshold) {
    // Steepness and center control logistic shape
    const k = 0.1; // adjust steepness
    const x0 = threshold; // inflection at the safe limit

    // Logistic function
    const logistic = 1 / (1 + Math.exp(-k * (value - x0)));

    // Scale to 0–100
    return Math.round(logistic * 100);
}


function calculateNormalizedAQI(components) {
    let totalScore = 0;
    let count = 0;

    for (const key in thresholds) {
        if (components[key] !== undefined) {
            const normScore = normalizePollutant(components[key], thresholds[key]);
            totalScore += normScore;
            count++;
        }
    }

    const averageScore = count > 0 ? totalScore / count : 0;
    return Math.round(averageScore);
}



// Get AQI for a given lat/lon
const getAQI = async (lat, lon) => {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: OPENWEATHER_API_KEY,
    });

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?${params.toString()}`;

    const response = await axios.get(url);

    const data = response.data.list[0];
    const components = data.components;

    const aqi = calculateNormalizedAQI(components);
    return aqi;  // 0–100 scale
}

module.exports = { getRoute, getAQI }