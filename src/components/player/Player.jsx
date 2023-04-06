import React from "react";
import { useSelector } from "react-redux";
import PlayerTotal from "./PlayerTotal";
import Hit from "./Hit";
import PlayerCards from "./PlayerCards";
import Play from "./Play";
import Stand from "./Stand";
import Double from "./Double";

const Player = () => {
  const { started, stand, playerTotal, double } = useSelector(
    (state) => state.blackjack
  );

  return (
    <section className="d-flex flex-column align-items-center h-60 p-2 w-100">
      {!started ? <Play /> : ""}
      <div className="d-flex align-items-center">
        <PlayerCards />
      </div>
      {started ? <PlayerTotal /> : ""}
      <div className="d-flex ">
        <div className="m-1">
          {!started ? (
            ""
          ) : stand ? (
            ""
          ) : double ? (
            ""
          ) : playerTotal >= 21 ? (
            ""
          ) : playerTotal === "blackjack" ? (
            ""
          ) : (
            <Hit />
          )}
        </div>
        <div className="m-1">
          {!started ? (
            ""
          ) : stand ? (
            ""
          ) : double ? (
            ""
          ) : playerTotal >= 21 ? (
            ""
          ) : playerTotal === "blackjack" ? (
            ""
          ) : (
            <Stand />
          )}
        </div>
        <div className="m-1">
          {!started ? (
            ""
          ) : stand ? (
            ""
          ) : double ? (
            ""
          ) : playerTotal >= 21 ? (
            ""
          ) : playerTotal === "blackjack" ? (
            ""
          ) : (
            <Double />
          )}
        </div>
      </div>
    </section>
  );
};

export default Player;
