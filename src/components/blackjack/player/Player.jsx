import React from "react";
// import Join from "./Join";
import Play from "./Play";
import Hit from "./Hit";
import Stand from "./Stand";
import PlayerCards from "./PlayerCards";
import { useSelector } from "react-redux";
import PlayerTotal from "./PlayerTotal";

const Player = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  const stand = useSelector((state) => state.blackjack.stand);
  const playerTotal = useSelector((state) => state.blackjack.playerTotal);

  return (
    <div className="player-container">
      {/* <Join /> */}
      {card ? "" : <Play />}
      {/* {!cards ? <Play /> : ""} */}
      <div className="cards">
        {card ? <PlayerCards /> : "Click Play to start"}
      </div>
      <PlayerTotal />
      {!card ? "" : playerTotal > 21 ? "" : stand === true ? "" : <Hit />}
      {!card ? "" : playerTotal > 21 ? "" : stand === true ? "" : <Stand />}
    </div>
  );
};

export default Player;
