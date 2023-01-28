import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReset, setCards } from "../../../features/blackjackSlice";
import axios from "axios";

const BustModal = () => {
  const dispatch = useDispatch();
  const deck = useSelector((state) => state.blackjack.deckId);
  const drawCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=4`;
    const newcards = await axios.get(url);
    dispatch(setCards(newcards.data.cards));
  };
  const playAgain = (cards) => {
    dispatch(setReset());
  };
  return (
    <>
      <div className="modal_content">
        <h1>What a shame! You busted.</h1>
        <button className="play_again_btn"
          onClick={() => {
            playAgain();
            drawCard();
          }}
        >
          Play again?
        </button>
      </div>
    </>
  );
};

export default BustModal;
