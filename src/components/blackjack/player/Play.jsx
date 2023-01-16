import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../../../features/blackjackSlice";

const Play = () => {
  const deck = useSelector((state) => state.blackjack.deckId);
  const dispatch = useDispatch();
  const drawCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=4`;
    const cards = await axios.get(url);
    dispatch(setCards(cards.data.cards));
  };
  return <button onClick={() => drawCard()}>Play</button>;
};

export default Play;
