import React from "react";
import { RandomCardPicker } from "../../../utils/RandomCardPicker";

const Split = ({
  remainingDeck,
  setDeck,
  setPlayerCards,
  playerCards,
  handIndex,
  split,
  setSplit,
  stake,
  setStake,
  chips,
  setChips,
  blackjack,
  setBlackjack,
}) => {
  const splitHand = (index) => {
    if (playerCards.length >= 1 && playerCards.length < 4) {
      const draw1 = RandomCardPicker(remainingDeck);
      const draw2 = RandomCardPicker(draw1.array);

      let split1 = playerCards[index][0][0];
      let split2 = playerCards[index][0][1];

      const newHand1 = [split1, draw1.card];
      const newHand2 = [split2, draw2.card];

      // Check if new hands have blackjack
      const newHand1Blackjack =
        newHand1.reduce((sum, card) => sum + card.value, 0) === 21;
      const newHand2Blackjack =
        newHand2.reduce((sum, card) => sum + card.value, 0) === 21;

      const newPlayerCards = [...playerCards];
      newPlayerCards[index] = [newHand1];
      newPlayerCards.push([newHand2]);

      setPlayerCards(newPlayerCards);
      setDeck(draw2.array);

      const newStake = [...stake];
      newStake[index] = stake[index];

      // Find the next 0 in stake and replace it with the current stake
      const nextZeroIndex = newStake.findIndex(
        (stakeValue) => stakeValue === 0
      );
      if (nextZeroIndex !== -1) {
        newStake[nextZeroIndex] = stake[index];
      }

      setStake(newStake);

      // Update blackjack state
      setBlackjack((prevState) => {
        const newBlackjack = [...prevState];
        newBlackjack[index] = newHand1Blackjack;
        newBlackjack[(index + 1) % 4] = newHand2Blackjack;
        return newBlackjack;
      });

      setChips(chips - stake[index]);
    }
  };

  const buttonText = window.innerWidth <= 480 ? "Sp" : "Split";

  return (
    <button
      className="splitButton d-flex"
      onClick={() => {
        splitHand(handIndex);
        setSplit(split + 1);
      }}
    >
      <div>{buttonText}</div>
    </button>
  );
};

export default Split;
