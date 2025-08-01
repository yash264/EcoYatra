const dotenv = require('dotenv')
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const thresholds = {
    co: 500,
    no: 30,
    no2: 40,
    o3: 60,
    so2: 40,
    pm2_5: 30,
    pm10: 50,
    nh3: 200
};

function scaleToAQIRange(ratio) {
    const minAQI = 100;
    const maxAQI = 400;
    const clamped = Math.min(ratio, 2.5);
    return Math.round(minAQI + ((clamped / 2.5) * (maxAQI - minAQI)));
}


function calculateAQI(components) {
    let total = 0;
    let count = 0;

    for (const key in thresholds) {
        if (components[key] !== undefined) {
            const value = components[key];
            const threshold = thresholds[key];
            const ratio = value / threshold;
            total += scaleToAQIRange(ratio);
            count++;
        }
    }

    return count > 0 ? Math.round(total / count) : 0;
}


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

    const aqi = calculateAQI(components);
    
    return aqi;  // 0–100 scale
}


const extractComponents = async (lat, lon) => {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: OPENWEATHER_API_KEY,
    });

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?${params.toString()}`;

    const response = await axios.get(url);
    return response.data.list[0];  
}


module.exports = { getAQI, extractComponents }