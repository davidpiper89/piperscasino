import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayerDrawnCard,
  setPlayerHighTotal,
} from "../../../features/blackjackSlice";

const Hit = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const playerHighTotal = useSelector(
    (state) => state.blackjack.playerHighTotal
  );
  const playerLowTotal = useSelector((state) => state.blackjack.playerLowTotal);
  const dispatch = useDispatch();
  const drawHitCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);

    dispatch(setPlayerDrawnCard(card.data.cards));
  };

  if (playerHighTotal > 21 && playerLowTotal > 0) {
    dispatch(setPlayerHighTotal(playerLowTotal));
  }
  if (playerHighTotal === 21) {
    return "21";
  }
  if (playerHighTotal > 21) {
    return "Bust";
  }
  return <button className = "hit_button" onClick={() => drawHitCard()}>Hit</button>;
};

export default Hit;
