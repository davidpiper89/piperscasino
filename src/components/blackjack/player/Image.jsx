import React from "react";

const Image = (card) => {
  const image = card.card.image;

  const code = card.card.code;
  return <img src={image} alt={code} width="120px" />;
};

export default Image;
