import React from "react";
import Image from "../Image";
import { useSelector } from "react-redux";

const DealerCards = () => {
  const dealerCards = useSelector((state) => state.blackjack.dealerCards);

  return dealerCards.map((card) => {
    return (
      <div key={card.image} className="m-1 cardContainer" >
        <Image card={card} />
      </div>
    );
  });
};

export default DealerCards;
