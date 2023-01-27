import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayerDrawnCard,
} from "../../../features/blackjackSlice";

const Hit = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const playerTotal = useSelector(
    (state) => state.blackjack.playerTotal
  );
  const dispatch = useDispatch();
  const drawHitCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);

    dispatch(setPlayerDrawnCard(card.data.cards));
  };


  if (playerTotal === 21) {
    return "21";
  }
  if (playerTotal > 21) {
    return "";
  }
  return <button className = "hit_button" onClick={() => drawHitCard()}>Hit</button>;
};

export default Hit;
