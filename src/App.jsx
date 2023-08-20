import { useState } from "react";
import "./App.css";
import MainGame from "./MainGame";
import MainMenu from "./MainMenu";
import GameOverScreen from "./GameOverScreen";

function App() {
  const [gameState, setGameState] = useState("menu"); //menu, play, gameover

  return (
    <>
      <h1>X-Men Memory Game</h1>
      {gameState == "menu" ? (
        <MainMenu />
      ) : gameState == "gameover" ? (
        <GameOverScreen />
      ) : (
        <MainGame />
      )}
    </>
  );
}

export default App;
