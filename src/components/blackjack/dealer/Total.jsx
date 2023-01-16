import React from "react";
import { useSelector } from "react-redux";
// import { numberCard } from "../../../utils/utils";

const Total = () => {
  const cards = useSelector((state) => state.blackjack.dealerCards);
  // const [cardTotals, setTotals] = useState([]);

  let cardTotals = [];

  const numberCard = (cards) => {
    cards.forEach((card) => {
      const ace = 11;
      const ten = 10;
      if (card.value === "ACE") {
        return cardTotals.push(ace);
      }
      if (
        card.value === "KING" ||
        card.value === "QUEEN" ||
        card.value === "JACK"
      ) {
        return cardTotals.push(ten);
      }
      return cardTotals.push(Number(card.value));
    });
  };
  numberCard(cards);

  let total = cardTotals.reduce((a, b) => a + b, 0)

  return <div>{total === 0 ? "" : total}</div>;
};
export default Total;
