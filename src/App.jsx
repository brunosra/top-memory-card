import { useState } from "react";
import "./App.css";
import MainGame from "./components/MainGame";
import MainMenu from "./components/MainMenu";
import GameOverScreen from "./components/GameOverScreen";

function App() {
  const [gameState, setGameState] = useState("menu"); //menu, play, gameover

  return (
    <>
      {gameState == "menu" ? (
        <MainMenu handleStartGame={() => setGameState("play")} />
      ) : gameState == "gameover" ? (
        <GameOverScreen />
      ) : (
        <MainGame />
      )}
    </>
  );
}

export default App;
