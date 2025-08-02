import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home";

function App() {

  axios.defaults.withCredentials = true;

  const startServer = async () => {
    try {
      const response = await axios.get('https://ecoyatra.onrender.com/startServer');

      console.log(response.data.message);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    startServer();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
