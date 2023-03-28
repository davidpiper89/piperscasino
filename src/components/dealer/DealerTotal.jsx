import React, { useEffect } from "react";
import { cardConverterToTotals } from "../../utils/cardConverter.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealerTotal,
  setDealerDrawn,
  setRemainderDeck,
} from "../../features/blackjackSlice.js";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import { totalCalc } from "../../utils/totalCalc.js";

const DealerTotal = () => {
  const dispatch = useDispatch();

  const dealerCards = useSelector((state) => state.blackjack.dealerCards);
  const dealerTotals = cardConverterToTotals(dealerCards);
  const remainderDeck = useSelector((state) => state.blackjack.remainderDeck);
  const deck = [...remainderDeck];

  const total = totalCalc(dealerTotals)

  useEffect(() => {
    if (dealerTotals.length >= 2 && total < 17) {
      setTimeout(() => {
        dealerDraw(deck);
      }, 500);
    }
  }, [dealerTotals]);

  const dealerDraw = (deck) => {
    const dealerDrawn = RandomCardPicker(deck);
    const drawnCard = dealerDrawn.card;

    const remainingCards = dealerDrawn.array;
    dispatch(setRemainderDeck(remainingCards));
    dispatch(setDealerDrawn(drawnCard));
  };

  useEffect(() => {
    dispatch(setDealerTotal(total));
  }, [total]);

  return <p className="fw-bold m-1 fs-5">{total} </p>;

  
};

export default DealerTotal;
