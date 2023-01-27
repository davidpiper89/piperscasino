import React from "react";
import { useSelector } from "react-redux";

const Bust = () => {
  const playerTotal = useSelector(
    (state) => state.blackjack.playerTotal
  );


  if (playerTotal > 21) {
    return <div>Bust</div>;
  }
 
};

export default Bust;
