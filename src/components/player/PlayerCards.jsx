import React from "react";
import Image from "../Image";
import { useSelector } from "react-redux";

const PlayerCards = () => {
  const playerCards = useSelector((state) => state.blackjack.playerCards);

  return playerCards.map((card) => {
    return (
      <div
        className=" m-1 bg-success cardContainer "
        key={card.image}
      >
        <Image card={card} />
      </div>
    );
  });
};

export default PlayerCards;
