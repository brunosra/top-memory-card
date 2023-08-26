import React from "react";
import "./Card.css";
import Tilt from "react-parallax-tilt";

function Card({ name = "", image = "", handleClick, id = "" }) {
  return (
    <Tilt
      tiltReverse
      reset
      glareEnable={true}
      glareMaxOpacity={0.4}
      glareColor={"#fff"}
      glarePosition="all"
      className="card"
    >
      <div onClick={handleClick} id={id}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <div className="glow"></div>
      </div>
    </Tilt>
  );
}

export default Card;
