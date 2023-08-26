import React from "react";

function GameOverScreen({ handlePlayAgain, won, score, highscore }) {
  return (
    <div id="gameover">
      <h1>Game Over!</h1>
      {won && <h2>You Won!</h2>}
      <h3>
        Your Score: {score} | High Score: {highscore}
      </h3>
      <button onClick={handlePlayAgain}>Play again?</button>
    </div>
  );
}

export default GameOverScreen;
