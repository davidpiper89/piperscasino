import React from "react";
import { useSelector } from "react-redux";
import Image from "./Image";
import "../../../App.css"

const PlayerCards = () => {
  const playerCards = useSelector((state) => state.blackjack.playerCards);

  return playerCards.map((card) => {
    return (
      <div key={card.image}>
        <Image card={card} />
      </div>
    );
  });
};

export default PlayerCards;
