import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Card from "./Card";
import "./MainGame.css";
import Spinner from "./Spinner";
import axios from "axios";
import md5 from "md5";

console.log(import.meta.env.VITE_API_SECRET_KEY);

const MainGame = forwardRef(({ handleCardClick, qtyCards }, ref) => {
  const [board, setBoard] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const ts = Date.now();
      const hash = md5(
        `${ts}${import.meta.env.VITE_API_SECRET_KEY}${
          import.meta.env.VITE_API_KEY
        }`
      );
      const url = `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&ts=${ts}&hash=${hash}&limit=40`;

      const options = {
        method: "GET",
        url: url,
      };

      const result = await axios.request(options);

      const marvelData = result.data.data.results;

      let newCharacters = [];
      marvelData.map((hero) =>
        newCharacters.push({
          name: hero.name,
          image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
        })
      );
      // Remove heroes without images
      let characters = newCharacters.filter(
        (hero) => !hero.image.includes("image_not_available")
      );

      // Manually Removing Non-X-men Characters
      let xMenCharacters = characters.filter((hero) => {
        return (
          hero.name != "Captain America" &&
          hero.name != "Black Panther" &&
          hero.name != "Iron Man" &&
          hero.name != "X-Factor" &&
          hero.name != "X-Men"
        );
      });

      let finalCharacters = [];
      while (finalCharacters.length < qtyCards) {
        let pickedHero = xMenCharacters.splice(
          Math.floor(Math.random() * xMenCharacters.length),
          1
        );
        finalCharacters.push(pickedHero[0]);
      }
      setHeroes(finalCharacters);
      setBoard(finalCharacters);
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
