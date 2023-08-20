import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function MainGame() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const timestamp = currentDate.getTime();
    const result = await axios(
      "https://hn.algolia.com/api/v1/search?query=redux"
    );

    setData(result.data);
  });

  return (
    <div id="main-game">
      <div className="board">
        <Card
          name="Apocalypse"
          image="http://i.annihil.us/u/prod/marvel/i/mg/f/e0/526166076a1d0.jpg"
        />
      </div>
    </div>
  );
}

export default MainGame;
