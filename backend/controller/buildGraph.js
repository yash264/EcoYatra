const { getAQI } = require("../ExternalAPI/getAQI");


function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = deg => deg * (Math.PI / 180);
    const R = 6371e3;
    const φ1 = toRad(lat1), φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1), Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


const buildGraph = async (points) => {
    const graph = {};
    const aqiCache = {};
    const nodeMap = {}; // key -> [lon, lat]

    for (let i = 0; i < points.length - 1; i++) {
        const [lon1, lat1] = points[i];
        const [lon2, lat2] = points[i + 1];

        const key1 = `${lat1.toFixed(5)},${lon1.toFixed(5)}`;
        const key2 = `${lat2.toFixed(5)},${lon2.toFixed(5)}`;

        if (!aqiCache[key1]) aqiCache[key1] = await getAQI(lat1, lon1);
        if (!aqiCache[key2]) aqiCache[key2] = await getAQI(lat2, lon2);

        const dist = haversineDistance(lat1, lon1, lat2, lon2);
        const weight = (aqiCache[key1] + aqiCache[key2]) / 2 + dist / 1000;

        if (!Array.isArray(graph[key1])) graph[key1] = [];
        if (!Array.isArray(graph[key2])) graph[key2] = [];

        graph[key1].push([key2, weight]);
        graph[key2].push([key1, weight]);

        nodeMap[key1] = [lon1, lat1];
        nodeMap[key2] = [lon2, lat2];
    }

    return { graph, nodeMap };
};


module.exports = { buildGraph };
