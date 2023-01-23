import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealerDrawnCard } from "../../../features/blackjackSlice";
import axios from "axios";

const DealerTotal = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const dealerCards = useSelector((state) => state.blackjack.dealerFaceCards);
  const dispatch = useDispatch();

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
  numberCard(dealerCards);

  let total = cardTotals.reduce((a, b) => a + b, 0);


  useEffect(() => {
    if (dealerCards.length >= 2 && total < 17) {
      drawCard();
    }
  }, [dealerCards]);
  async function drawCard() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);
    dispatch(setDealerDrawnCard(card.data.cards));
  }
  if (dealerCards.length === 2 && total > 17) {
    return <div>{total === 0 ? "" : total}</div>;
  } else {
    return <div>{total === 0 ? "" : total}</div>;
  }
};
export default DealerTotal;
