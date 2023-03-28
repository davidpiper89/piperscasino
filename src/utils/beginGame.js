import { RandomCardPicker } from "./RandomCardPicker";
export const beginGame = (deck) => {
  const firstDraw = RandomCardPicker(deck);
  const card1 = firstDraw.card;
  const deck1 = firstDraw.array;
  const secondDraw = RandomCardPicker(deck1);
  const card2 = secondDraw.card;
  const deck2 = secondDraw.array;
  const thirdDraw = RandomCardPicker(deck2);
  const card3 = thirdDraw.card;
  const deck3 = thirdDraw.array;
  const fourthDraw = RandomCardPicker(deck3);
  const card4 = fourthDraw.card;
  const deck4 = fourthDraw.array;
  const initialCards = [card1, card2, card3, card4];
  return {deck4, initialCards}
};
