import React from "react";
// import Join from "./Join";
import Play from "./Play";
import Hit from "./Hit";
import Stand from "./Stand";
import BustModal from "./BustModal";
import PlayerCards from "./PlayerCards";
import { useSelector } from "react-redux";
import PlayerTotal from "./CardConverter";

const Player = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  const stand = useSelector((state) => state.blackjack.stand);
  const playerHighTotal = useSelector(
    (state) => state.blackjack.playerHighTotal
  );
  const playerLowTotal = useSelector(
    (state) => state.blackjack.playerHighTotal
  );

  return (
    <div className="player-container">
      {/* <Join /> */}
      {card ? "" : <Play />}
      {/* {!cards ? <Play /> : ""} */}
      <div className="cards">
        {card ? <PlayerCards /> : "Click Play to start"}
      </div>
      {!card ? "" : <PlayerTotal />}

      {!card ? (
        ""
      ) : playerHighTotal >= 21 ? (
        ""
      ) : playerLowTotal >= 21 ? (
        ""
      ) : stand === true ? (
        ""
      ) : (
        <Hit />
      )}
      {!card ? (
        ""
      ) : playerHighTotal >= 21 ? (
        ""
      ) : playerLowTotal >= 21 ? (
        ""
      ) : stand === true ? (
        ""
      ) : (
        <Stand />
      )}
      {/* { playerHighTotal > 21 ? <BustModal /> : ""} */}
    </div>
  );
};

export default Player;
