import React from "react";
import "./Card.css";

function Card({ name = "", image = "", handleClick, id = "" }) {
  return (
    <div className="card" onClick={handleClick} id={id}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default Card;
