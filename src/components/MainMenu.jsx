import React from "react";

function MainMenu({ handleStartGame, difficulty }) {
  return (
    <div id="main-menu">
      <h1>X-Men Memory Game</h1>
      <h2>Welcome to the Game</h2>
      {difficulty.map((item) => (
        <button key={item.name} onClick={() => handleStartGame(item.cards)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default MainMenu;
