import React, { useEffect } from "react";
import { ace, ten } from "../../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setDealerDrawnCard,
  setDealerTotal,
  setDealerBlackjack,
} from "../../../features/blackjackSlice";

const DealerCardCalculations = (totalArray) => {
  const cards = totalArray.totalArray;
  const deck = useSelector((state) => state.blackjack.deckId);
  const dispatch = useDispatch();

  let dealerHighTotal = 0;
  let dealerLowTotal = 0;

  useEffect(() => {
    if (cards.length >= 2 && dealerHighTotal < 17) {
      setTimeout(() => {
        console.log("delay card draw 0.5 second");
        drawCard();
      }, 500);
    }
  }, [cards]);

  async function drawCard() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);
    dispatch(setDealerDrawnCard(card.data.cards));
  }
  // dealer blackjack
  if (cards[0] === ace && cards[1] === ten) {
    dispatch(setDealerBlackjack());
    return <div className="dealer_total">Blackjack</div>;
  }
  if (cards[1] === ace && cards[0] === ten) {
    dispatch(setDealerBlackjack(true));
    return <div className="dealer_total">Blackjack</div>;
  }

  if (!cards.includes(ace)) {
    //dealer no aces
    dealerHighTotal = cards.reduce((a, b) => a + b, 0);
    dispatch(setDealerTotal(dealerHighTotal));
    return <div className="dealer_total">{dealerHighTotal}</div>;
  }

  //dealer has aces
  if (cards.includes(ace)) {
    const aces = [];
    const pushAces = (arr, item) => {
      cards.forEach((card) => {
        if (card === ace) {
          aces.push(card);
        }
      });
    };
    pushAces(cards, ace);
    // one ace
    if (aces.length === 1) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      dealerHighTotal = aces[0].high + sum;
      dealerLowTotal = aces[0].low + sum;
      if (dealerHighTotal > 21) {
        dealerHighTotal = dealerLowTotal;
      }
      dispatch(setDealerTotal(dealerHighTotal));
      return (
        <div className="dealer_total">
          {dealerHighTotal > 21 ? dealerLowTotal : dealerHighTotal}
        </div>
      );
    }
    // two aces
    if (aces.length === 2) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      dealerHighTotal = aces[0].high + aces[1].low + sum;
      dealerLowTotal = aces[0].low + aces[1].low + sum;
      if (dealerHighTotal > 21) {
        dealerHighTotal = dealerLowTotal;
      }
      dispatch(setDealerTotal(dealerHighTotal));
      return (
        <div className="dealer_total">
          {dealerHighTotal > 21 ? dealerLowTotal : dealerHighTotal}
        </div>
      );
    }
    // three aces
    if (aces.length === 3) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      dealerHighTotal = aces[0].high + aces[1].low + aces[2].low + sum;
      dealerLowTotal = aces[0].low + aces[1].low + aces[2].low + sum;
      if (dealerHighTotal > 21) {
        dealerHighTotal = dealerLowTotal;
      }
      dispatch(setDealerTotal(dealerHighTotal));
      return (
        <div className="dealer_total">
          {dealerHighTotal > 21 ? dealerLowTotal : dealerHighTotal}
        </div>
      );
    }
    //four aces
    if (aces.length === 4) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      dealerHighTotal =
        aces[0].high + aces[1].low + aces[2].low + aces[3].low + sum;
      dealerLowTotal =
        aces[0].low + aces[1].low + aces[2].low + aces[3].low + sum;
      if (dealerHighTotal > 21) {
        dealerHighTotal = dealerLowTotal;
      }
      dispatch(setDealerTotal(dealerHighTotal));
      return (
        <div className="dealer_total">
          {dealerHighTotal > 21 ? dealerLowTotal : dealerHighTotal}
        </div>
      );
    }
  }
};

export default DealerCardCalculations;
