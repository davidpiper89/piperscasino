import { RandomCardPicker } from "./RandomCardPicker";

export const beginGame = (deck) => {
  let currentDeck = deck;
  let initialCards = [];

  for (let i = 0; i < 4; i++) {
    const draw = RandomCardPicker(currentDeck);
    initialCards.push(draw.card);
    currentDeck = draw.array;
  }

  const dealerCards = [initialCards[1]];
  const dealerHidden = [initialCards[3]];

  // Wrapping playerCards in an array to make it a 2D array
  const playerCards = [[initialCards[0], initialCards[2]]];

  return { currentDeck, dealerCards, playerCards, dealerHidden };
};
