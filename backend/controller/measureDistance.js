const { getRoute } = require("../ExternalAPI/getRoute");
const { buildGraph } = require('./buildGraph');
const dijkstra = require('./dijkstra');
const { extractComponents } = require("../ExternalAPI/getAQI");


const findNearestKey = (coord, nodeMap) => {
    let minDist = Infinity;
    let nearest = null;
    for (const [key, value] of Object.entries(nodeMap)) {
        const dist = Math.hypot(coord[0] - value[0], coord[1] - value[1]);
        if (dist < minDist) {
            minDist = dist;
            nearest = key;
        }
    }
    return nearest;
};


const measureDistance = async (req, res) => {
    try {
        const { start, end } = req.body;

        const route = await getRoute(start, end);
        const coordinates = route.features[0].geometry.coordinates;

        const [startLon, startLat] = start;
        const componentsList = await extractComponents(startLat, startLon);

        const { graph, nodeMap } = await buildGraph(coordinates);

        const startKey = findNearestKey(start, nodeMap);
        const endKey = findNearestKey(end, nodeMap);

        if (!startKey || !endKey || !graph[startKey] || !graph[endKey]) {
            return res.status(400).json({ error: 'Start or end node not found in graph.' });
        }

        const { path, totalAQI } = dijkstra(graph, startKey, endKey);
        if (!path || path.length < 2) {
            return res.status(400).json({ error: 'No path found' });
        }

        const parseKey = key => nodeMap[key]; // lon, lat
        const isClose = (c1, c2, tol = 1e-4) =>
            Math.abs(c1[0] - c2[0]) <= tol && Math.abs(c1[1] - c2[1]) <= tol;

        const fullPath = [];

        for (let i = 0; i < path.length - 1; i++) {
            const from = parseKey(path[i]);
            const to = parseKey(path[i + 1]);
            let segmentStarted = false;

            for (let j = 0; j < coordinates.length; j++) {
                const point = coordinates[j];

                if (isClose(point, from)) {
                    segmentStarted = true;
                    fullPath.push(point);
                } else if (segmentStarted) {
                    fullPath.push(point);
                    if (isClose(point, to)) break;
                }
            }
        }

        const lastPoint = parseKey(path[path.length - 1]);
        if (!fullPath.some(pt => isClose(pt, lastPoint))) {
            fullPath.push(lastPoint);
        }

        const uniquePath = fullPath.filter(
            (coord, index, self) =>
                index === self.findIndex(c => c[0] === coord[0] && c[1] === coord[1])
        );

        return res.json({
            route: uniquePath,
            componentsList
        });

    } catch (error) {
        console.error('Error in measureDistance:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { measureDistance };
