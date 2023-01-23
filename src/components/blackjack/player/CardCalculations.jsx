import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ace, ten } from "../../../utils/config";
import {
  setPlayerBlackjack,
  setPlayerLowTotal,
  setPlayerHighTotal,
} from "../../../features/blackjackSlice";

const CardCalculations = () => {
  const playerCards = useSelector((state) => state.blackjack.playerCardTotals);
  // const playerBlackjack = useSelector(
  //   (state) => state.blackjack.playerBlackjack
  // );
  let cards = [...playerCards];

  const dispatch = useDispatch();

  let highTotal = 0;
  let lowTotal = 0;

  if (cards[0] === ace && cards[1] === ten) {
    dispatch(setPlayerBlackjack());
    return <div>Blackjack1</div>;
  }
  if (cards[1] === ace && cards[0] === ten) {
    dispatch(setPlayerBlackjack());
    return <div>Blackjack2</div>;
  }
  if (!cards.includes(ace)) {
    // not including ace
    highTotal = cards.reduce((a, b) => a + b, 0);
    dispatch(setPlayerHighTotal(highTotal))
    return <div>{highTotal}</div>;
  }
  // including aces
  if (cards.includes(ace)) {
    let indexOf = cards.indexOf(ace);
    const aces = cards.splice(indexOf, 1);

    highTotal = aces[0].high + cards.reduce((a, b) => a + b, highTotal);
    lowTotal = aces[0].low + cards.reduce((a, b) => a + b, lowTotal);
    dispatch(setPlayerLowTotal(lowTotal));
    dispatch(setPlayerHighTotal(highTotal));
    return (
      <div>
        {lowTotal}({highTotal})
      </div>
    );
  }
};

export default CardCalculations;
