import React from "react";
import DealerTotal from "./DealerTotal";
import DealerCards from "./DealerCards";
import { useSelector } from "react-redux";
import Results from "../results/Results";

const Dealer = () => {
  const started = useSelector((state) => state.blackjack.started);

  return (
    <section className="d-flex flex-column align-items-center h-40 mt-3">
      <div className="d-flex">
        <DealerCards />
      </div>
      {started ? <DealerTotal /> : ""}
      {started ? <Results /> : ""}
    </section>
  );
};

export default Dealer;
