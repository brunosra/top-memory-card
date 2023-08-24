import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import Card from "./Card";
import "./MainGame.css";
import Spinner from "./Spinner";

const MainGame = forwardRef(({ handleCardClick, qtyCards }, ref) => {
  const [board, setBoard] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `http://localhost:5200/${qtyCards}`,
    };
    const fetchHeroes = async () => {
      const result = await axios.request(options);
      setHeroes(result.data);
      setBoard(result.data);
    };
    fetchHeroes();
  }, [qtyCards]);

  useImperativeHandle(ref, () => ({
    shuffleCards() {
      let finalCharacters = [];
      let copyHeroes = [...heroes];
      while (finalCharacters.length < qtyCards) {
        let pickedHero = copyHeroes.splice(
          Math.floor(Math.random() * copyHeroes.length),
          1
        );
        finalCharacters.push(pickedHero[0]);
      }
      setBoard(finalCharacters);
    },
  }));

  return (
    <div id="main-game">
      <div className="board">
        {board.length > 0 ? (
          board.map((hero) => (
            <Card
              key={hero.name}
              id={hero.name}
              name={hero.name}
              image={hero.image}
              handleClick={handleCardClick}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
});

MainGame.displayName = "MainGame";

export default MainGame;
