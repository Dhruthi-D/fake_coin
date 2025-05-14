import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [customCoins, setCustomCoins] = useState("");

  const startGame = (numCoins) => {
    navigate(`/game/${numCoins}`);
  };

  const handleCustomStart = () => {
    const num = parseInt(customCoins);
    if (!isNaN(num) && num >= 3 && num <= 50) {
      startGame(num);
    } else {
      alert("Please enter a number between 3 and 50.");
    }
  };

  return (
    <div className="home-container">
      <h1>🪙 The Fake Coin Challenge</h1>
      <p>Select the number of coins to play with:</p>

      <div className="card-container">
        {[5, 8, 12, 18].map((num) => (
          <div key={num} className="coin-card" onClick={() => startGame(num)}>
            <h2>{num}</h2>
            <p>coins</p>
          </div>
        ))}
      </div>

      <div className="custom-input">
        <input
          type="number"
          min="3"
          max="50"
          placeholder="Enter custom coin count"
          value={customCoins}
          onChange={(e) => setCustomCoins(e.target.value)}
        />
        <button onClick={handleCustomStart}>Start</button>
      </div>
      
      <Link to="/learn" className="learn-more-button">Learn More</Link>

      <footer>
        <p>Test your logic and beat the scale! ⚖️</p>
      </footer>
    </div>
  );
  

}

export default Home;
