import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerFirstSplit } from "../../../features/blackjackSlice";

const SplitFirst = () => {
  const playerCardsTotals = useSelector(
    (state) => state.blackjack.playerCardTotals
  );
  const playerCards = useSelector((state) => state.blackjack.playerCards);
  const dispatch = useDispatch();
  const splitCards = () => {
    dispatch(setPlayerFirstSplit(playerCards));
  };

  if (playerCardsTotals.length === 2) {
    if (playerCardsTotals[0] === playerCardsTotals[1]) {
      return (
        <button className="split_button" onClick={() => splitCards()}>
          Split
        </button>
      );
    } else return "";
  }
};

export default SplitFirst;
