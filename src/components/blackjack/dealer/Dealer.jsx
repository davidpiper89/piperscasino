import React from "react";
import DealerCards from "./DealerCards";
import Total from "./Total";

const Dealer = () => {
  return (
    <div className="dealer-container">
      <div className="cards">
        <DealerCards />
        
      </div>
      <Total />
    </div>
  );
};

export default Dealer;
