import React, { useEffect } from "react";
import { cardConverterToTotals } from "../../utils/cardConverter.js";
import { useDispatch } from "react-redux";
import {
  setDealerHidden,
  setPlayerTotal,
} from "../../features/blackjackSlice.js";
import { useSelector } from "react-redux";
import { totalCalc } from "../../utils/totalCalc.js";

const PlayerTotal = () => {
  const dispatch = useDispatch();
  const playerCards = useSelector((state) => state.blackjack.playerCards);
  const playerTotals = cardConverterToTotals(playerCards);
  const double = useSelector((state) => state.blackjack.double);

  const total = totalCalc(playerTotals);

  useEffect(() => {
    if (double && total <= 21) {
      dispatch(setDealerHidden());
    }
  }, [double]);

  useEffect(() => {
    dispatch(setPlayerTotal(total));
  }, [total]);

  useEffect(() => {

    if (total === 21) dispatch(setDealerHidden());
  },[total]);

  return <p className="fw-bold m-1 fs-5">{total} </p>;
};

export default PlayerTotal;
