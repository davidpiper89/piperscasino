import React from "react";
import { useSelector } from "react-redux";
import Image from "./Image";

const PlayerFirstSplitCards = () => {
  const firstSplitCards = useSelector(
    (state) => state.blackjack.splitOnceCards
  );
  return firstSplitCards.map((card) => {
    return (
      <div key={card.imagee}>
        <Image card={card} />
      </div>
    );
  });
};

export default PlayerFirstSplitCards;
