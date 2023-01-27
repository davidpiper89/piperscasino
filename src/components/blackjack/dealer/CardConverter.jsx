import React from "react";
import { useSelector } from "react-redux";
import "./Dealer.css";
import DealerCardCalculations from "./DealerCardCalculations";
import { ace, ten } from "../../../utils/config";

const CardConverter = () => {
  const dealerCards = useSelector((state) => state.blackjack.dealerFaceCards);

  let cardTotals = [];

  const numberCard = (cards) => {
    cards.forEach((card) => {
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
  numberCard(dealerCards);

  return <DealerCardCalculations totalArray={cardTotals} />;

};
export default CardConverter;
