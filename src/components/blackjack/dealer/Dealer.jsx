import React from "react";
import { useSelector } from "react-redux";
import DealerCards from "./DealerCards";
import CardConverter from "./CardConverter";

const Dealer = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  return (
    <div className="dealer-container">
      <div className="cards">
        <DealerCards />
        
      </div>
      
      {!card ? "" : <CardConverter />}
    </div>
  );
};

export default Dealer;
