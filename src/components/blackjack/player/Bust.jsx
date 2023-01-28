import React from "react";
import { useSelector } from "react-redux";
import BustModal from "./BustModal";
import "./BustModal.css"

const Bust = () => {
  const playerTotal = useSelector(
    (state) => state.blackjack.playerTotal
  );


  if (playerTotal > 21) {
    return <div className ="open_modal"><BustModal/></div>;
  }
 
};

export default Bust;
