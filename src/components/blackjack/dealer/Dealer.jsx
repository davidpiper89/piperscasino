import React from "react";
import DealerCards from "./DealerCards";
import DealerTotal from "./DealerTotal";

const Dealer = () => {
  return (
    <div className="dealer-container">
      <div className="cards">
        <DealerCards />
        
      </div>
      
      <DealerTotal />
    </div>
  );
};

export default Dealer;
