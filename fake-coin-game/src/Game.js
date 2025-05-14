import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Game() {
  const { numCoins } = useParams();
  const navigate = useNavigate();
  const coinCount = parseInt(numCoins);
  const maxWeighings = Math.ceil(Math.log2(coinCount)); // Estimate
  const [tiltDirection, setTiltDirection] = useState("balanced");

  const [fakeCoin, setFakeCoin] = useState(null);
  const [weighCount, setWeighCount] = useState(0);
  const [leftPan, setLeftPan] = useState([]);
  const [rightPan, setRightPan] = useState([]);
  const [result, setResult] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setFakeCoin(Math.floor(Math.random() * coinCount));
  }, [coinCount]);

  const handleDrop = (e, pan) => {
    e.preventDefault();
    const coin = parseInt(e.dataTransfer.getData("coin"));
    if (locked) return;

    // Remove coin from both pans
    setLeftPan((prev) => prev.filter((c) => c !== coin));
    setRightPan((prev) => prev.filter((c) => c !== coin));

    // Add coin to dropped pan
    if (pan === "left") {
      setLeftPan((prev) => [...prev, coin]);
    } else {
      setRightPan((prev) => [...prev, coin]);
    }
  };

  const weigh = () => {
  if (locked) return;


  if (leftPan.includes(fakeCoin)) {
    setResult("⚖️ Left pan is heavier.");
    setTiltDirection("left");
  } else if (rightPan.includes(fakeCoin)) {
    setResult("⚖️ Right pan is heavier.");
    setTiltDirection("right");
  } else {
    setResult("⚖️ Balanced.");
    setTiltDirection("balanced");
  }

  setWeighCount((prev) => prev + 1);
};


  const clearPans = () => {
  setLeftPan([]);
  setRightPan([]);
  setResult("");
  setTiltDirection("balanced"); // Reset the tilt
};


  const guess = (coin) => {
    const extra = weighCount > maxWeighings ? weighCount - maxWeighings : 0;
navigate("/result", {
  state: {
    correct: coin === fakeCoin,
    fakeCoin: fakeCoin + 1,
    guess: coin + 1,
    weighingsUsed: weighCount,
    allowedWeighings: maxWeighings,
    extraWeighings: extra,
  },
});

  };

  return (
    <div className="container">
      <h2>Fake Coin Game ({coinCount} coins)</h2>
      <p>Weighings left: {maxWeighings - weighCount}</p>

      {/* Coins to drag */}
      <div className="coins">
        {[...Array(coinCount)].map((_, i) => (
          <div
            key={i}
            className="coin draggable"
            draggable={!locked}
            onDragStart={(e) => e.dataTransfer.setData("coin", i)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Balance scale with left and right pans */}
      <div className={`scale tilt-${tiltDirection}`}>

        <div
          className="pan left-pan"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "left")}
        >
          <h4>Left Pan</h4>
          {leftPan.map((c) => (
            <div key={c} className="coin small">
              {c + 1}
            </div>
          ))}
        </div>

        <div
          className="pan right-pan"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "right")}
        >
          <h4>Right Pan</h4>
          {rightPan.map((c) => (
            <div key={c} className="coin small">
              {c + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="controls">
        <button onClick={weigh}>⚖️ Weigh</button>
        <button onClick={clearPans}>🔄 Clear</button>
      </div>

      {/* Weighing Result */}
      <p>{result}</p>

      {/* Guess Section */}
      <h3>Guess the fake coin:</h3>
      <div className="guess-panel">
        {[...Array(coinCount)].map((_, i) => (
          <button
            key={i}
            className="guess-coin"
            disabled={locked}
            onClick={() => guess(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
