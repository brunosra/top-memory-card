import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./MainGame.css";
import Spinner from "./Spinner";

function MainGame() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  let qty = 10;

  useEffect(() => {
    const options = {
      method: "GET",
      url: `http://localhost:5200/${qty}`,
    };
    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error.error);
      });
  }, []);

  return (
    <div id="main-game">
      <div className="board">
        {data.length > 0 ? (
          data.map((hero) => (
            <Card key={hero.name} name={hero.name} image={hero.image} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default MainGame;
