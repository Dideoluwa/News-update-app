import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Footer from "./Components/Footer";
import RandomNewsFeed from "./Components/RandomNewsFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchNews from "./Components/SearchNews";
import Nigeria from "./Components/Nigeria";
import Sports from "./Components/Sports";
import WorldEconomy from "./Components/WorldEconomy";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<RandomNewsFeed />} />
          <Route path="/nigeria" element={<Nigeria />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/economy" element={<WorldEconomy />} />
          <Route path="/search" element={<SearchNews />} />
        </Routes>
        {/* Don't forget to come here after!!! */}
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
