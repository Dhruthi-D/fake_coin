import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    correct,
    fakeCoin,
    guess,
    weighingsUsed,
    allowedWeighings,
    extraWeighings,
  } = location.state || {};

  const playAgain = () => {
    navigate("/");
  };

  useEffect(() => {
    // Launch confetti if solved within allowed weighings
    if (correct && extraWeighings === 0) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [correct, extraWeighings]);

  return (
    <div className="container">
      <h1>🔍 Game Over</h1>

      <h2 style={{ color: correct ? "green" : "red" }}>
        {correct ? "🎉 You found the fake coin!" : "❌ Wrong guess!"}
      </h2>

      <p>
        ✅ <strong>Fake coin:</strong> {fakeCoin}
      </p>
      <p>
        🎯 <strong>Your guess:</strong> {guess}
      </p>
      <p>
        ⚖️ <strong>Weighings used:</strong> {weighingsUsed}
      </p>
      <p>
        🎯 <strong>Allowed weighings:</strong> {allowedWeighings}
      </p>

      {extraWeighings > 0 ? (
        <p style={{ color: "orangered" }}>
          ⏱️ You used <strong>{extraWeighings}</strong> extra weighing
          {extraWeighings > 1 ? "s" : ""}. Try to solve it in fewer steps!
        </p>
      ) : correct ? (
        <p style={{ color: "green" }}>
          🎉 Perfect! You solved it within the optimal limit!
        </p>
      ) : null}

      <button onClick={playAgain} style={{ marginTop: "20px" }}>
        🔁 Play Again
      </button>
    </div>
  );
}

export default Result;
