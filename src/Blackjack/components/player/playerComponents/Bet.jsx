import React from "react";

const Bet = ({ hand, handIndex, stake, setStake }) => {

  return <div className="bet-text">Bet: {stake[handIndex]}</div>;
};

export default Bet;
