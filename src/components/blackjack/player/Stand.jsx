import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealersHand, setplayerStand } from "../../../features/blackjackSlice";

const Stand = () => {

  const dealerHiddenCard = useSelector(
    (state) => state.blackjack.dealerHidden[0]
  );
  const dispatch = useDispatch();

  const stand = (h) => {
    // const dealersHand = card.concat(hidden)
    dispatch(setDealersHand(dealerHiddenCard));
    dispatch(setplayerStand())
  };

  return (
    <button onClick={() => stand(dealerHiddenCard)}>Stand</button>
  );
};

export default Stand;
