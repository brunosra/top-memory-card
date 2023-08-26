import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";
import MainGame from "./components/MainGame";
import MainMenu from "./components/MainMenu";
import GameOverScreen from "./components/GameOverScreen";
import AudioController from "./components/AudioController";

const difficulty = [
  {
    name: "easy",
    cards: 4,
  },
  {
    name: "normal",
    cards: 10,
  },
  {
    name: "hard",
    cards: 16,
  },
];
function App() {
  const [gameState, setGameState] = useState("menu"); //menu, play, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [qtyCards, setQtyCards] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [won, setWon] = useState(false);

  const mainGameRef = useRef(null);

  const startGame = (numCards) => {
    setScore(0);
    setGameState("play");
    setQtyCards(numCards);
    setWon(false);
    setSelectedCards([]);
  };

  const handleCardClick = (e) => {
    const clickedHero = e.target.parentNode.id;

    if (!selectedCards.includes(clickedHero)) {
      // right guess
      setScore(score + 1);
      if (score + 1 == qtyCards) {
        setWon(true);
        setGameState("gameover");
        if (score + 1 > highScore) {
          setHighScore(score + 1);
        }
      } else {
        setSelectedCards([...selectedCards, clickedHero]);
        mainGameRef.current.shuffleCards();
      }
    } else {
      //Game Over!
      //check high score
      if (score > highScore) {
        setHighScore(score);
      }
      setGameState("gameover");
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <AudioController isPlaying={true} />
      <div className="main-content">
        {gameState == "menu" ? (
          <MainMenu
            handleStartGame={startGame}
            difficulty={difficulty}
            highScore={highScore}
          />
        ) : gameState == "gameover" ? (
          <GameOverScreen
            handlePlayAgain={() => setGameState("menu")}
            won={won}
            score={score}
            highscore={highScore}
          />
        ) : (
          <>
            <div id="scorecard">
              <div>
                Your Score: <span value="value">{score}</span>
              </div>
              <div>
                High Score: <span value="value">{highScore}</span>
              </div>
            </div>
            <MainGame
              ref={mainGameRef}
              handleCardClick={handleCardClick}
              qtyCards={qtyCards}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
