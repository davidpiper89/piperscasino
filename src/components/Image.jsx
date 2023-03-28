import React from "react";

const Image = ({ card }) => {
  return (
    <div>
      <img
        src={`../../../assets/${card.image}.svg`}
        alt="missing img"
        className="w-100"
      />
    </div>
  );
};

export default Image;
