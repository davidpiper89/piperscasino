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
  const playerCards = useSelector((state) => state.blackjack.playerCards);
  const dealerCards = useSelector((state) => state.blackjack.dealerCards);
  const dealerEnd = useSelector((state) => state.blackjack.dealerEnd);

  //player ened go by stand or double
  useEffect(() => {
    if (stand || double === true) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 2000);
    }
  }, [double, stand]);

  //player blackjack
  useEffect(() => {
    if (playerTotal === 21 && playerCards.length === 2) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 1000);
    }
  }, [playerTotal]);

  //player hit 21 but not blackjack
  useEffect(() => {
    if (playerTotal === 21 && playerCards.length > 2) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 2000);
    }
  }, [playerTotal]);

  //dealer blackjack
  useEffect(() => {
    if (dealerTotal === 21 && dealerCards.length === 2) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 1000);
    }
  }, [dealerCards]);

  //player busts
  useEffect(() => {
    if (playerTotal > 21) {
      setTimeout(() => {
        dispatch(setDealerEnd());
      }, 1000);
    }
  }, [playerTotal]);

  //PLAYER WINS
  //player blackjack
  if (playerTotal === 21 && playerCards.length === 2 && dealerEnd) {
    const result = { win: "You win!", result: "BlackJack" };
    return <ResultsModal result={result} />;
  }
  //dealer busts
  if (dealerTotal > 21 && dealerEnd) {
    const result = { win: "You win!", result: "Dealer Busts" };
    return <ResultsModal result={result} />;
  }
  //player wins higher total
  if (playerTotal <= 21 && playerTotal > dealerTotal && dealerEnd === true) {
    const result = { win: "You win!", result: "Higher total" };
    return <ResultsModal result={result} />;
  }

  //DEALER WINS

  //dealer blackjack
  if (dealerTotal === 21 && dealerCards.length === 2 && dealerEnd) {
    const result = { win: "You lose!", result: "Dealer Blackjack!" };
    return <ResultsModal result={result} />;
  }
  //dealer wins higher total
  if (dealerTotal > playerTotal && dealerTotal <= 21 && dealerEnd) {
    const result = { win: "You lose!", result: "Dealer higher total" };
    return <ResultsModal result={result} />;
  }
  //player busts
  if (playerTotal > 21 && dealerEnd) {
    const result = { win: "You lose!", result: "Bust!" };
    return <ResultsModal result={result} />;
  }

  //PUSH

  if (dealerTotal === playerTotal && dealerEnd) {
    const result = { win: "Push", result: "Same total" };
    return <ResultsModal result={result} />;
  }
};

export default Results;