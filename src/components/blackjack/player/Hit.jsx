import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerDrawnCard } from "../../../features/blackjackSlice";

const Hit = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const dispatch = useDispatch();
  const drawHitCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);
    console.log("player hit");

    dispatch(setPlayerDrawnCard(card.data.cards));
  };
  return <button onClick={() => drawHitCard()}>Hit</button>;
};

export default Hit;
