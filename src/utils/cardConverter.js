import { ace } from "./config";

export const cardConverterToTotals = (array) => {
  const cardTotals = [];
  array.forEach((card) => {
    if (card.value === "ACE") {
      return cardTotals.push(ace);
    }
    if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK"
    ) {
      return cardTotals.push(10);
    }
    return cardTotals.push(Number(card.value));
  });
  return cardTotals;
};
