import React from "react";
import "./Interface.css"
import Dealer from "../dealer/Dealer";
import Player from "../player/Player";

const Interface = () => {
  return (
    <>
      <div className="interface-container">
        <div>
          <Dealer />
        </div>
        <div>
          <Player />
        </div>
      </div>
    </>
  );
};

export default Interface;
