import React from "react";

const CardImage = ({ card }) => {
  return (
    <img
      src={`../../assets/${card.image}.svg`}
      alt="missing img"
      className="card-image"
    />
  );
};

export default CardImage;
