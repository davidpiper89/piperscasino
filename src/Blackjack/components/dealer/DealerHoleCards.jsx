import React from "react";
import CardImage from "../CardImage";

const DealerHoleCards = ({ dealerCards }) => {
  return dealerCards.map((card, index) => (
    <div key={index} className="dealerCard">
      <CardImage card={card} key={card.image} />
    </div>
  ));
};

export default DealerHoleCards;
