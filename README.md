# 🚲 EcoYatra - Navigate the Cleanest Way

**EcoYatra** is a smart web application that helps users find the **least polluted route** between two locations using real-time **Air Quality Index (AQI)** data.
It combines mapping, air quality analysis, and routing algorithms to promote healthier and more eco-friendly travel.

## 🌐 Live Demo
>   https://ecoyatra-meta.vercel.app

---

## 🔧 Tech Stack

### 🖥 Frontend
- **Leaflet + React-Leaflet** – Interactive map rendering
- **OpenRouteService API** – Routing and navigation data
- **OpenWeatherMap API** – Real-time AQI data
- **Geolocation API** – Detects user's current location

### ⚙️ Backend
- **Custom Dijkstra’s Algorithm** – For calculating the shortest (least AQI) path
- **Graph Construction** – Builds weighted graphs from route coordinates
- **AQI Normalization** – Custom logic to convert pollutant components into practical AQI

---

## 📍 Features

- 🔍 **Real-time Geolocation** – Detects user's current location automatically
- 🌬️ **Live AQI Fetching** – Retrieves AQI for each route segment
- 📈 **Normalized AQI Calculation** – Custom formula to reflect practical values (100–400 typical in India)
- 🗺️ **Interactive Map UI** – Click to set origin & destination
- 🧮 **Least Polluted Route Calculation** – Uses Dijkstra’s algorithm with AQI as weights
- 🌈 **Air Quality Legend** – Displays category (Good, Fair, Moderate, Poor, etc.)

---
