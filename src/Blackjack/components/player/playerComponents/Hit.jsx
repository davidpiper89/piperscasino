import React from "react";
import { RandomCardPicker } from "../../../utils/RandomCardPicker";

const Hit = ({
  remainingDeck,
  setDeck,
  setPlayerCards,
  handIndex,
  playerCards,
}) => {
  const handleHit = (remainingDeck) => {
    const hit = RandomCardPicker(remainingDeck);
    const newPlayerCards = [...playerCards];

    newPlayerCards[handIndex][0].push(hit.card);

    setPlayerCards(newPlayerCards);
    setDeck(hit.array);
  };

  const buttonText = window.innerWidth <= 480 ? "H" : "Hit";

  return (
    <button className="hitButton d-flex" onClick={() => handleHit(remainingDeck)}>
      <div>{buttonText}</div>
    </button>
  );
};
export default Hit;
