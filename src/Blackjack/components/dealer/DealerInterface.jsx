import React, { useEffect, useState, useCallback } from "react";
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
}) => {
  let playerBusted;

  if (split === 0) {
    playerBusted = bust[0];
  }
  if (split === 1) {
    playerBusted = bust[0] && bust[1];
  }
  if (split === 2) {
    playerBusted = bust[0] && bust[1] && bust[2];
  }

  useEffect(() => {
    if (!playerBusted) {
      const timeoutId = setTimeout(() => {
        if (
          playerEnd &&
          dealerHidden &&
          !dealerCards.includes(dealerHidden[0])
        ) {
          const newDealerCards = [...dealerCards, dealerHidden[0]];
          setDealerCards(newDealerCards);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [playerEnd, dealerCards, dealerHidden, setDealerCards, playerBusted]);

  const dealerDraw = useCallback(
    (remainingDeck) => {
      const newCard = RandomCardPicker(remainingDeck);
      const newCards = [...dealerCards, newCard.card];

      setDealerCards(newCards);
      setDeck(newCard.array);
    },
    [dealerCards, setDealerCards, setDeck]
  );

  useEffect(() => {
    if (playerBusted) {
      setDealerEnd(true);
      return;
    } else if (dealerCards && dealerCards.length >= 2 && dealerTotal < 17) {
      const timeoutId = setTimeout(() => {
        dealerDraw(remainingDeck);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (playerEnd && dealerTotal >= 17) {
      setDealerEnd(true);
    }
  }, [
    dealerCards,
    remainingDeck,
    dealerTotal,
    dealerDraw,
    playerEnd,
    setDealerEnd,
    split,
    bust,
  ]);

  return (
    <>
      {!bet ? (
        ""
      ) : (
        <div data-testid="dealer-interface">
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
      )}
    </>
  );
};

export default DealerInterface;
