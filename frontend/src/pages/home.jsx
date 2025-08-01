import React from "react";
import Navbar from "../Helpers/Navbar";
import Header from "../Components/Header";
import Features from "../Components/Features";
import MapView from "../Components/MapView";
import Footer from "../Components/Footer";

function Home() {
  return (
    <>
      <body className="relative">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white">
          <Navbar />
        </header>

        <main className="pt-16">
          <Header />
          <Features />
          <MapView />
          <Footer />
        </main>
        
      </body>
    </>
  );
}

export default Home;