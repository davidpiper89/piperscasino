import React from "react";
import { useSelector } from "react-redux";
import Image from "./Image";


const DealerCards = () => {
  const dealerCards = useSelector((state) => state.blackjack.dealerCards);

  return dealerCards.map((card) => {
    return (
      <div key={card.image}>
        <Image card={card} />
      </div>
    );
  });
};

export default DealerCards;
