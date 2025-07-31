const PriorityQueue = require('./priority_queue'); // You’ll write a simple one below

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = new Set(Object.keys(graph));

    for (const node of queue) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    while (queue.size > 0) {
        let current = null;
        let minDistance = Infinity;

        for (const node of queue) {
            if (distances[node] < minDistance) {
                minDistance = distances[node];
                current = node;
            }
        }

        if (current === null || !graph[current]) break;
        if (current === end) break;

        queue.delete(current);
        visited.add(current);

        const neighbors = graph[current];

        if (!Array.isArray(neighbors)) {
            console.error("Invalid neighbor list at:", current);
            continue;
        }

        for (const [neighbor, weight] of neighbors) {
            if (visited.has(neighbor)) continue;

            const newDist = distances[current] + weight;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = current;
            }
        }
    }

    const path = [];
    let node = end;

    while (node) {
        path.unshift(node);
        node = previous[node];
    }

    return {
        path: path.length > 0 ? path : [start],
        totalAQI: distances[end] === Infinity ? 0 : distances[end]
    };
}

module.exports = dijkstra;

