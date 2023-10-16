import React, { useEffect, useCallback, useRef } from "react";
import DealerHoleCards from "./DealerHoleCards";
import Total from "../Total";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import "./Dealer.css";

const DealerInterface = ({
  dealerCards,
  dealerHidden,
  remainingDeck,
  setDeck,
  setDealerCards,
  dealerTotal,
  setDealerTotal,
  bet,
  playerEnd,
  setDealerEnd,
  bust,
  split,
  blackjack,
}) => {
  //work out if player busts in 1 or all hands
  const playerBusted = bust.slice(0, split + 1).every(Boolean);
  //work out if player 1 hand blackjack
  const playerOneHandBlackjack = blackjack[0] && split === 0;
  //work out if player has blackjacks in split hands
  const playerBlackJackInSplit = blackjack.includes(true) && split > 0;

  // dealer draw mechanic

  const dealerDraw = useCallback(() => {
    const newCard = RandomCardPicker(remainingDeck);
    setDealerCards((prevCards) => [...prevCards, newCard.card]);
    setDeck(newCard.array);
  }, [remainingDeck, setDealerCards, setDeck]);

  // what to do if player gets blackjack
  useEffect(() => {
    if (playerOneHandBlackjack && bet) {
      if (dealerCards[0].value === 10 || dealerCards[0].value === "ACE") {
        const timeoutId = setTimeout(() => {
          setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
        }, 1500);

        return () => clearTimeout(timeoutId);
      } else {
        setDealerEnd(true);
      }
    }
  }, [playerOneHandBlackjack, bet]);

  useEffect(() => {
    if (dealerCards && dealerCards.length === 2 && blackjack[0] === true) {
      setDealerEnd(true);
    }
  }, [dealerCards]);

  // what to do if player busts

  useEffect(() => {
    if (playerBusted) {

      setDealerEnd(true);
    }
  }, [playerBusted]);

  // what to do if player go has ended, they haven't busted and they don't have blackjack

  useEffect(() => {
    if (
      !playerBusted &&
      !playerOneHandBlackjack &&
      !playerBlackJackInSplit &&
      playerEnd &&
      dealerCards &&
      dealerCards.length === 1
    ) {
  
      const timeoutId = setTimeout(() => {
        setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
      }, 1200);
      return () => clearTimeout(timeoutId);
    }
  }, [playerBusted, playerOneHandBlackjack, dealerCards, playerEnd]);

  useEffect(() => {
    if (
      !playerBusted &&
      !playerOneHandBlackjack &&
      playerEnd &&
      dealerCards &&
      dealerCards.length >= 2
    ) {
      if (dealerTotal < 17) {
        const timeoutId = setTimeout(dealerDraw, 1000);
        return () => clearTimeout(timeoutId);
      } else {
        setDealerEnd(true);
      }
    }
  }, [dealerCards, dealerTotal, playerBusted, blackjack, playerEnd]);

  // what do to if player has split and has some blackjacks

  useEffect(() => {
    if (
      !playerBusted &&
      playerBlackJackInSplit &&
      playerEnd &&
      dealerCards &&
      dealerCards.length === 1
    ) {
      const timeoutId = setTimeout(() => {
        setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [playerEnd, playerBusted, blackjack, dealerCards, dealerHidden]);

  useEffect(() => {
    if (
      !playerBusted &&
      playerBlackJackInSplit &&
      split &&
      playerEnd &&
      dealerCards &&
      dealerCards.length >= 2
    ) {
      if (dealerTotal < 17) {
        const timeoutId = setTimeout(dealerDraw, 1000);
        return () => clearTimeout(timeoutId);
      } else {
        setDealerEnd(true);
      }
    }
  }, [dealerCards, dealerTotal, playerBusted, blackjack, playerEnd]);

  return bet ? (
    <div data-testid="dealer-interface" className="dealerInterface">
      <div className="d-flex justify-content-center align-items-center">
        <DealerHoleCards dealerCards={dealerCards} />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Total
          hand={dealerCards}
          handIndex={0}
          total={dealerTotal}
          setTotal={setDealerTotal}
        />
      </div>
    </div>
  ) : null;
};

export default DealerInterface;
