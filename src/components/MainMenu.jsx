import React from "react";

function MainMenu({ handleStartGame }) {
  return (
    <div id="main-menu">
      <h1>X-Men Memory Game</h1>
      <h2>Welcome to the Game</h2>
      <button onClick={handleStartGame}>Play</button>
      {import.meta.env.VITE_API_KEY}
    </div>
  );
}

export default MainMenu;
