import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setReset,
  setCards,
  setDealerEndGo,
} from "../../../features/blackjackSlice";
import "./ResultsModal.css";

const ResultsModal = () => {
  const dispatch = useDispatch();
  const deck = useSelector((state) => state.blackjack.deckId);
  const dealerTotal = useSelector((state) => state.blackjack.dealerTotal);
  const playerTotal = useSelector((state) => state.blackjack.playerTotal);
  const dealerEndGo = useSelector((state) => state.blackjack.dealerEndGo);
  const stand = useSelector((state) => state.blackjack.stand);
  const double = useSelector((state) => state.blackjack.double)
  const playerBlackjack = useSelector((state)=> state.blackjack.playerBlackjack)
  const dealerFirstCard = useSelector((state)=> state.blackjack)

  const drawCard = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=4`;
    const newcards = await axios.get(url);
    dispatch(setCards(newcards.data.cards));
  };
  const playAgain = (cards) => {
    dispatch(setReset());
  };

  if (stand === true) {
    setTimeout(() => {
      dispatch(setDealerEndGo(true));
    }, 2000);
  }
  if (double === true) {
    setTimeout(() => {
      dispatch(setDealerEndGo(true));
    }, 2000);
  }



  //dealer busts
  if (dealerTotal > 21 && dealerEndGo === true) {
    return (
      <div className="open_modal">
        <div className="modal_content">
          <h1> You win. Dealer busts</h1>
          <button
            className="play_again_btn"
            onClick={() => {
              playAgain();
              drawCard();
            }}
          >
            Play again?
          </button>
        </div>
      </div>
    );
  }

  //dealer wins
  if (dealerTotal > playerTotal && dealerTotal < 21 && dealerEndGo === true) {
    return (
      <div className="open_modal">
        <div className="modal_content">
          <h1> You lose.</h1>
          <button
            className="play_again_btn"
            onClick={() => {
              playAgain();
              drawCard();
            }}
          >
            Play again?
          </button>
        </div>
      </div>
    );
  }
  //player higher card total
  if (dealerTotal < playerTotal && dealerTotal < 21 && dealerEndGo === true) {
    return (
      <div className="open_modal">
        <div className="modal_content">
          <h1> You win.</h1>
          <button
            className="play_again_btn"
            onClick={() => {
              playAgain();
              drawCard();
            }}
          >
            Play again?
          </button>
        </div>
      </div>
    );
  }
   //same score
   if (dealerTotal === playerTotal && dealerEndGo === true) {
    return (
      <div className="open_modal">
        <div className="modal_content">
          <h1> Push </h1>
          <button
            className="play_again_btn"
            onClick={() => {
              playAgain();
              drawCard();
            }}
          >
            Play again?
          </button>
        </div>
      </div>
    );
  }
};

export default ResultsModal;
