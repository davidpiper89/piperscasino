import React from "react";
// import Join from "./Join";
import Play from "./Play";
import Hit from "./Hit";
import Stand from "./Stand";
import BustModal from "./BustModal";
import PlayerCards from "./PlayerCards";
import { useSelector } from "react-redux";
import CardConverter from "./CardConverter";
import "./Player.css"

const Player = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  const stand = useSelector((state) => state.blackjack.stand);
  const playerHighTotal = useSelector(
    (state) => state.blackjack.playerHighTotal
  );
  const isBlackjack = useSelector((state) => state.blackjack.playerBlackjack);

  return (
    <div className="player-container">
      {/* <Join /> */}
      {card ? "" : <Play />}
      {/* {!cards ? <Play /> : ""} */}
      <div className="cards">
        {card ? <PlayerCards /> : "Click Play to start"}
      </div>
      {!card ? "" : <CardConverter />}
      <div className="player_buttons">
      {!card ? "" : stand === true ? "" : isBlackjack === true ? "" : <Hit />}
      {!card ? (
        ""
      ) : playerHighTotal >= 21 ? (
        ""
      ) : stand === true ? (
        ""
      ) : isBlackjack === true ? (
        ""
      ) : (
        <Stand />
      )}
      </div>

      <BustModal />
    </div>
  );
};

export default Player;
