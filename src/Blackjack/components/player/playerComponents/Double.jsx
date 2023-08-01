import React from "react";
import { RandomCardPicker } from "../../../utils/RandomCardPicker";

const Double = ({
  remainingDeck,
  setDeck,
  playerCards,
  setPlayerCards,
  handIndex,
  double,
  setDouble,
  stake,
  setStake,
  chips,
  setChips,
  setTotal,
}) => {
  const handleDouble = (remainingDeck, index) => {
    const hit = RandomCardPicker(remainingDeck);
    const newPlayerCards = [...playerCards];
    newPlayerCards[handIndex][0].push(hit.card);

    setPlayerCards(newPlayerCards);
    setDeck(hit.array);

    const newStake = [...stake];
    newStake[index]*= 2;
    setStake(newStake);
    setChips(chips - newStake[index] / 2);

    setDouble((prevState) => {
      let updatedDouble = [...prevState];
      updatedDouble[index] = true;
      return updatedDouble;
    });

    setTotal((prevState) => {
      const newTotal = [...prevState];

      newTotal[handIndex] += hit.card.value;
      return newTotal;
    });
  };

  const buttonText = window.innerWidth <= 480 ? "D" : "Double";

  return (
    <button
      className="doubleButton d-flex"
      onClick={() => handleDouble(remainingDeck, handIndex)}
    >
      <div>{buttonText}</div>
    </button>
  );
};

export default Double;
