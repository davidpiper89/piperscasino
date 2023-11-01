import React from "react";
import { RandomCardPicker } from "../../../utils/RandomCardPicker";
import { MOBILE_BUTTON_BREAKPOINT } from "../../../../config/config";

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

  const buttonText =
    window.innerWidth <= MOBILE_BUTTON_BREAKPOINT ? "H" : "Hit";

  return (
    <button
      className="hitButton d-flex"
      onClick={() => handleHit(remainingDeck)}
    >
      <div>{buttonText}</div>
    </button>
  );
};
export default Hit;
