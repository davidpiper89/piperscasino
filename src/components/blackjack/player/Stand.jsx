import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealersHand, setplayerStand } from "../../../features/blackjackSlice";

const Stand = () => {
  const dealerCard = useSelector((state) => state.blackjack.dealerCards);
  const dealerHiddenCard = useSelector(
    (state) => state.blackjack.dealerHidden[0]
  );
  const dispatch = useDispatch();

  const stand = (card, hidden) => {
    const dealersHand = card.concat(hidden)
    dispatch(setDealersHand(dealersHand));
    dispatch(setplayerStand())
  };

  return (
    <button onClick={() => stand(dealerCard, dealerHiddenCard)}>Stand</button>
  );
};

export default Stand;
