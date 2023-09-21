import React from "react";

const CardImage = ({ card }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/${card.image}.svg`}
      alt="missing img"
      className="card-image"
    />
  );
};

export default CardImage;
