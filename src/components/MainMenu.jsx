import React from "react";
import gameLogo from "../assets/xmen-logo.png";
import "./mainMenu.css";

function MainMenu({ handleStartGame, difficulty, highScore }) {
  return (
    <div id="main-menu">
      <img src={gameLogo} alt="XMen Logo" className="logo" />
      <h1>Cerebro Game</h1>
      <h2>Use Cerebro to remember all the mutants, but don't repeat any!</h2>
      <h3 className="high-score">High Score: {highScore}</h3>
      <h3>Select difficulty level</h3>
      <div className="button-container">
        {difficulty.map((item) => (
          <button key={item.name} onClick={() => handleStartGame(item.cards)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainMenu;
