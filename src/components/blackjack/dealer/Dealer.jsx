import React from "react";
import { useSelector } from "react-redux";
import DealerCards from "./DealerCards";
import CardConverter from "./CardConverter";
import ResultsModal from "./ResultsModal";

const Dealer = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  return (
    <div className="dealer-container">
      <div className="dealer_card_container">
        <DealerCards />
      </div>

      {!card ? "" : <CardConverter />}
      <ResultsModal />
    </div>
  );
};

export default Dealer;
