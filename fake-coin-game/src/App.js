import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Result from "./Result";
import "./styles.css";
import LearnMore from "./LearnMore";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:numCoins" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/learn" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}

export default App;
