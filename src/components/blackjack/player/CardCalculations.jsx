import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ace, ten } from "../../../utils/config";
import {
  setPlayerBlackjack,
  setPlayerTotal,
} from "../../../features/blackjackSlice";

const CardCalculations = () => {
  const playerCards = useSelector((state) => state.blackjack.playerCardTotals);


  let cards = [...playerCards];

  const dispatch = useDispatch();

  let highTotal = 0;
  let lowTotal = 0;

  //player blackjack
  if (cards[0] === ace && cards[1] === ten) {
    dispatch(setPlayerBlackjack());
    return <div className="player_total">Blackjack</div>;
  }
  if (cards[1] === ace && cards[0] === ten) {
    dispatch(setPlayerBlackjack(true));
    return <div className="player_total">Blackjack</div>;
  }
  if (!cards.includes(ace)) {
    // not including ace
    highTotal = cards.reduce((a, b) => a + b, 0);
    dispatch(setPlayerTotal(highTotal));
    return (
      <div className="player_total">{highTotal > 21 ? "" : highTotal}</div>
    );
  }
  // including  aces
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

    if (aces.length === 1) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      highTotal = aces[0].high + sum;
      lowTotal = aces[0].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      dispatch(setPlayerTotal(highTotal));
      return (
        <div className="player_total">
          {highTotal > 21 ? lowTotal : highTotal}
        </div>
      );
    }
    // 2 aces
    else if (aces.length === 2) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      highTotal = aces[0].high + aces[1].low + sum;
      lowTotal = aces[0].low + aces[1].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      dispatch(setPlayerTotal(highTotal));
      return (
        <div className="player_total">
          {highTotal > 21 ? lowTotal : highTotal}
        </div>
      );
    }
    // 3 aces
    else if (aces.length === 3) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      highTotal = aces[0].high + aces[1].low + aces[2].low + sum;
      lowTotal = aces[0].low + aces[1].low + aces[2].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      dispatch(setPlayerTotal(highTotal));
      return (
        <div className="player_total">
          {highTotal > 21 ? lowTotal : highTotal}
        </div>
      );
    }
    // 4 aces
    else if (aces.length === 4) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      highTotal =
        aces[0].high + aces[1].low + aces[2].low + aces[3].low + sum;
      lowTotal = aces[0].low + aces[1].low + aces[2].low + aces[3].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      dispatch(setPlayerTotal(highTotal));
      return (
        <div className="player_total">
          {highTotal > 21 ? lowTotal : highTotal}
        </div>
      );
    }
  }
};

export default CardCalculations;
