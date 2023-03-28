import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealerEnd } from "../../features/blackjackSlice";

import ResultsModal from "./ResultsModal";

const Results = () => {
  const dispatch = useDispatch();
  const stand = useSelector((state) => state.blackjack.stand);
  const double = useSelector((state) => state.blackjack.double);
  const dealerTotal = useSelector((state) => state.blackjack.dealerTotal);
  const playerTotal = useSelector((state) => state.blackjack.playerTotal);
  const dealerEnd = useSelector((state) => state.blackjack.dealerEnd);

  useEffect(() => {
    if (stand || double === true) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 2000);
    }
  }, [double, stand]);

  useEffect(() => {
    if (playerTotal === 21) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 2000);
    }
  }, [playerTotal]);

  //PLAYER WINS
  //player blackjack
  if (playerTotal === "BlackJack") {
    const result = { win: "You win!", result: "BlackJack" };
    return <ResultsModal result={result} />;
  }
  //dealer busts
  if (dealerTotal > 21 && dealerEnd) {
    const result = { win: "You win!", result: "Dealer Busts" };
    return <ResultsModal result={result} />;
  }
  //player wins higher total
  if (playerTotal > dealerTotal && dealerEnd === true) {
    const result = { win: "You win!", result: "Higher total" };
    return <ResultsModal result={result} />;
  }

  //DEALER WINS

  //dealer wins higher total
  if (dealerTotal > playerTotal && dealerTotal <= 21 && dealerEnd) {
    const result = { win: "You lose!", result: "Dealer higher total" };
    return <ResultsModal result={result} />;
  }
  if (playerTotal > 21) {
    const result = { win: "You lose!", result: "Bust!" };
    return <ResultsModal result={result} />;
  }
  if (dealerTotal === "BlackJack") {
    const result = { win: "You lose!", result: "Dealer Blackjack!" };
    return <ResultsModal result={result} />;
  }

  //PUSH

  if (dealerTotal === playerTotal && dealerEnd) {
    const result = { win: "Push", result: "Same total" };
    return <ResultsModal result={result} />;
  }
};

export default Results;
