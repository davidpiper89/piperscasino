import React from "react";
// import Join from "./Join";
import Play from "./Play";
import Hit from "./Hit";
import Stand from "./Stand";
import Bust from "./Bust";
import PlayerCards from "./PlayerCards";
import { useSelector } from "react-redux";
import CardConverter from "./CardConverter";
import "./Player.css";
import Double from "./Double";
import SplitFirst from "./SplitFirst";
import PlayerFirstSplitCards from "./PlayerFirstSplitCards";

const Player = () => {
  const card = useSelector((state) => state.blackjack.playerCards[0]);
  const playerCards = useSelector((state) => state.blackjack.playerCards);
  const stand = useSelector((state) => state.blackjack.stand);
  const double = useSelector((state) => state.blackjack.double);
  const playerTotal = useSelector((state) => state.blackjack.playerTotal);
  const isBlackjack = useSelector((state) => state.blackjack.playerBlackjack);
  const isPlayerFirstSplit = useSelector(
    (state) => state.blackjack.splitOnceCards[0]
  );

  if (!isPlayerFirstSplit) {
    return (
      <div className="player-container">
        {card ? "" : <Play />}

        <div className="player_card_container">
          {card ? <PlayerCards /> : "Click Play to start"}
        </div>
        {!card ? "" : <CardConverter />}
        <div className="player_buttons">
          {!card ? (
            ""
          ) : stand === true ? (
            ""
          ) : double === true ? (
            ""
          ) : isBlackjack === true ? (
            ""
          ) : (
            <Hit />
          )}
          {!card ? (
            ""
          ) : playerTotal >= 21 ? (
            ""
          ) : stand === true ? (
            ""
          ) : double === true ? (
            ""
          ) : isBlackjack === true ? (
            ""
          ) : (
            <Stand />
          )}
          {!card ? (
            ""
          ) : playerTotal >= 21 ? (
            ""
          ) : double === true ? (
            ""
          ) : stand === true ? (
            ""
          ) : playerCards.length >= 3 ? (
            ""
          ) : isBlackjack === true ? (
            ""
          ) : (
            <Double />
          )}
          <SplitFirst />
        </div>

        <Bust />
      </div>
    );
  }

  if (isPlayerFirstSplit) {
    return (
      <>
        <div className="split-container">
          <div className="player-container">
            {card ? "" : <Play />}

            <div className="player_card_container">
              {card ? <PlayerCards /> : "Click Play to start"}
            </div>
            {!card ? "" : <CardConverter />}
            <div className="player_buttons">
              {!card ? (
                ""
              ) : stand === true ? (
                ""
              ) : double === true ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Hit />
              )}
              {!card ? (
                ""
              ) : playerTotal >= 21 ? (
                ""
              ) : stand === true ? (
                ""
              ) : double === true ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Stand />
              )}
              {!card ? (
                ""
              ) : playerTotal >= 21 ? (
                ""
              ) : double === true ? (
                ""
              ) : stand === true ? (
                ""
              ) : playerCards.length >= 3 ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Double />
              )}
            </div>

            <Bust />
          </div>

          <div className="player-container">
            {card ? "" : <Play />}

            <div className="player_card_container">
              <PlayerFirstSplitCards /> 
            </div>
            {!card ? "" : <CardConverter />}
            <div className="player_buttons">
              {!card ? (
                ""
              ) : stand === true ? (
                ""
              ) : double === true ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Hit />
              )}
              {!card ? (
                ""
              ) : playerTotal >= 21 ? (
                ""
              ) : stand === true ? (
                ""
              ) : double === true ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Stand />
              )}
              {!card ? (
                ""
              ) : playerTotal >= 21 ? (
                ""
              ) : double === true ? (
                ""
              ) : stand === true ? (
                ""
              ) : playerCards.length >= 3 ? (
                ""
              ) : isBlackjack === true ? (
                ""
              ) : (
                <Double />
              )}
            </div>

            <Bust />
          </div>
        </div>
      </>
    );
  }
};

export default Player;
