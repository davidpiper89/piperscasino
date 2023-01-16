import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawnCard } from "../../../features/blackjackSlice";

const Hit = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const dispatch = useDispatch();
  const drawCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);

    dispatch(setDrawnCard(card.data.cards));
  };
  return <button onClick={() => drawCard()}>Hit</button>;
};

export default Hit;
