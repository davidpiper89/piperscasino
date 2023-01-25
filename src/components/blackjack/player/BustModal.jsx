import React from "react";
import { useSelector } from "react-redux";

const Bust = () => {
  const playerHighTotal = useSelector(
    (state) => state.blackjack.playerHighTotal
  );
  const playerLowTotal = useSelector((state) => state.blackjack.playerLowTotal);

  if (playerHighTotal > 21 && playerLowTotal === 0) {
    return <div>Bust</div>;
  }
 
};

export default Bust;
