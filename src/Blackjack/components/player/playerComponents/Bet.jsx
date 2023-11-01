import React from "react";

const Bet = ({  handIndex, stake}) => {

  return <div className="betText">Bet: {stake[handIndex]}</div>;
};

export default Bet;
