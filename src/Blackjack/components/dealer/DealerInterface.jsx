import React, { useEffect, useCallback, useRef } from "react";
import DealerHoleCards from "./DealerHoleCards";
import Total from "../Total";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import "./Dealer.css";
import { cardConverterToTotals } from "../../utils/cardConverter";
import { totalCalc } from "../../utils/totalCalc";

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
    const timeoutId = setTimeout(() => {
      const newCard = RandomCardPicker(remainingDeck);
      setDealerCards((prevCards) => [...prevCards, newCard.card]);
      setDeck(newCard.array);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [remainingDeck, setDealerCards, setDeck]);

  //work out if player busts in 1 or all hands
  const playerBusted = bust.slice(0, split + 1).every(Boolean);
  //work out if player has blackjack in all hands
  const allHandsBlackjack =
    blackjack.slice(0, split + 1).every(Boolean) && split <= 3;
  const allHandsBlackjackRef = useRef(allHandsBlackjack);

  const calculateDealerTotal = (dealerCards) => {
    if (!dealerCards) return;
    const cardTotals = cardConverterToTotals(dealerCards);
    const { total: dealerTotal } = totalCalc(cardTotals);
    return dealerTotal;
  };

  useEffect(() => {
    allHandsBlackjackRef.current = allHandsBlackjack;
  }, [allHandsBlackjack]);

  useEffect(() => {
    if (playerBusted) {
      setDealerEnd(true);
    } else if (
      allHandsBlackjackRef.current &&
      !(dealerCards[0].value === "ACE" || dealerCards[0].value === 10)
    ) {
      setDealerEnd(true);
    }
  }, [playerEnd]);

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
      allHandsBlackjackRef.current &&
      (dealerCards[0].value === "ACE" || dealerCards[0].value === 10) &&
      playerEnd
    ) {
      const cleanup = dealerWillShowHiddenOnly();

      return cleanup;
    }
  }, [allHandsBlackjack, playerEnd]);

  const dealerWillDrawToSeventeenOrMore = () => {
    const timeoutId = setTimeout(() => {
      if (!allHandsBlackjackRef.current) {
        setDealerCards((prevCards) => [...prevCards, dealerHidden[0]]);
      }
    }, 1200);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (playerEnd && !allHandsBlackjackRef.current && !playerBusted) {
      dealerWillDrawToSeventeenOrMore();
    }
  }, [playerEnd]);

  useEffect(() => {
    const currentTotal = calculateDealerTotal(dealerCards);

    if (
      playerEnd &&
      !allHandsBlackjackRef.current &&
      !playerBusted &&
      dealerCards &&
      dealerCards.length >= 2 &&
      currentTotal < 17
    ) {
      dealerDraw();
    } else if (
      playerEnd &&
      !allHandsBlackjackRef.current &&
      !playerBusted &&
      dealerCards &&
      dealerCards.length >= 2 &&
      currentTotal >= 17
    ) {
      setDealerEnd(true);
    }
  }, [dealerCards]);

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
