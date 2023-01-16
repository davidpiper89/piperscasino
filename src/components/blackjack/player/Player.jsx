import React from "react";
// import Join from "./Join";
import Play from "./Play";
import Hit from "./Hit";
import Stand from "./Stand";
import PlayerCards from "./PlayerCards";
import { useSelector } from "react-redux";
import Total from "./Total";

const Player = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);

  return (
    <div className="player-container">
      {/* <Join /> */}
      {card ? "" : <Play />}
      {/* {!cards ? <Play /> : ""} */}
      <div className="cards">
        {card ? <PlayerCards /> : "Click Play to start"}
      </div>
      <Total />
      <Hit />
      <Stand />
    </div>
  );
};

export default Player;
