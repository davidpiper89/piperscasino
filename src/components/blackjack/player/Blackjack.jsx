import React from "react";
import {
  setDealersHand
} from "../../../features/blackjackSlice";

const Blackjack = () => {
  const dealerFirstCard = totalArray.totalArray[0];
  const isPlayerBlackjack = useSelector(
    (state) => state.blackjack.isPlayerBlackjack
  );
  const dealerHiddenCard = useSelector(
    (state) => state.blackjack.dealerHidden[0]
  );

  // player blackjack and dealer first card A or 10
  if (isPlayerBlackjack === true) {
    dispatch(setDealersHand(dealerHiddenCard));
  }

  return <div>Blackjack</div>;
};

export default Blackjack;
