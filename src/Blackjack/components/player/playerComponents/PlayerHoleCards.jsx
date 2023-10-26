import React from "react";
import CardImage from "../../CardImage";

const PlayerHoleCards = ({ hand, gridClass }) => {

  return hand.map((card, index) => (
    <div key={index} className={`playerCard${gridClass}`}>
      <CardImage card={card} key={card.image} />
    </div>
  ));
};

export default PlayerHoleCards;
