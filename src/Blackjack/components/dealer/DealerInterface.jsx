import React, { useEffect, useCallback } from "react";
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
  const dealerDraw = useCallback(() => {
    setTimeout(() => {
      console.log(dealerTotal);
      const newCard = RandomCardPicker(remainingDeck);
      setDealerCards((prevCards) => [...prevCards, newCard.card]);

      setDeck(newCard.array);
    }, 1500);
  }, [remainingDeck, setDealerCards, setDeck]);

  //work out if player busts in 1 or all hands
  const playerBusted = bust.slice(0, split + 1).every(Boolean);
  //work out if player has blackjack in all hands
  const allHandsBlackjack =
    blackjack.slice(0, split + 1).every(Boolean) && split <= 3;

  useEffect(() => {
    if (playerBusted) {
      setDealerEnd(true);
    } else if (
      allHandsBlackjack &&
      !(dealerCards[0].value === "ACE" || dealerCards[0].value === 10)
    ) {
      setDealerEnd(true);
    }
  }, [playerBusted, allHandsBlackjack]);

  const dealerWillShowHiddenOnly = () => {
    const timeoutId = setTimeout(() => {
      setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
      setTimeout(() => {
        setDealerEnd(true);
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  };
  useEffect(() => {
    if (
      allHandsBlackjack &&
      (dealerCards[0].value === "ACE" || dealerCards[0].value === 10) &&
      playerEnd
    ) {
      dealerWillShowHiddenOnly(allHandsBlackjack, dealerCards);
    }
  }, [allHandsBlackjack, playerEnd]);

  const dealerWillDrawToSeventeenOrMore = () => {
    const timeoutId = setTimeout(() => {
      setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
    }, 1200);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (playerEnd && !allHandsBlackjack && !playerBusted) {
      dealerWillDrawToSeventeenOrMore();
    }
  }, [allHandsBlackjack, playerBusted, playerEnd]);

  useEffect(() => {
    if (
      playerEnd &&
      !allHandsBlackjack &&
      !playerBusted &&
      dealerCards &&
      dealerCards.length >= 2 &&
      dealerTotal < 17
    ) {

      dealerDraw();
    } else if (
      playerEnd &&
      !allHandsBlackjack &&
      !playerBusted &&
      dealerCards &&
      dealerCards.length >= 2 &&
      dealerTotal >= 17
    ) {
      setDealerEnd(true);
    }
  }, [playerEnd, allHandsBlackjack, playerBusted, dealerTotal]);

  return bet ? (
    <div
      className="dealerInterface"
      role="region"
      aria-label="Dealer Interface"
    >
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
