import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setPlayerDrawnCard,
  setPlayerDouble,
  setDealersHand,
} from "../../../features/blackjackSlice";

const Double = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const dealerHiddenCard = useSelector(
    (state) => state.blackjack.dealerHidden[0]
  );
  const dispatch = useDispatch();
  const drawHitCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);

    dispatch(setPlayerDrawnCard(card.data.cards));
    dispatch(setDealersHand(dealerHiddenCard));
    dispatch(setPlayerDouble(true));
  };
  return (
    <button className="double_button" onClick={() => drawHitCard()}>
      Double
    </button>
  );
};

export default Double;
