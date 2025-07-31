const express = require('express');
const getShortestRoute = express.Router();

const { measureDistance } = require('../controller/measureDistance');

getShortestRoute.post('/measureDistance', measureDistance);

module.exports = getShortestRoute;