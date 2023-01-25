import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealersHand, setPlayerStand } from "../../../features/blackjackSlice";

const Stand = () => {

  const dealerHiddenCard = useSelector(
    (state) => state.blackjack.dealerHidden[0]
  );
  const dispatch = useDispatch();

  const stand = (h) => {
    // const dealersHand = card.concat(hidden)
    dispatch(setDealersHand(dealerHiddenCard));
    dispatch(setPlayerStand())
  };

  return (
    <button className = "stand_button" onClick={() => stand(dealerHiddenCard)}>Stand</button>
  );
};

export default Stand;
