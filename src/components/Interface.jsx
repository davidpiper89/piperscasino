import React from "react";
import Dealer from "./dealer/Dealer";
import Player from "./player/Player";
import Container from "react-bootstrap/Container";
// import { useSelector } from "react-redux";

const Interface = () => {
  // const card = useSelector((state) => state.blackjack.playerCards[0]);

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center bg-success p-4 "
      style={{ height: "100vh" }}
    
      
    >
      <Dealer />
      <Player />
    </Container>
  );
};

export default Interface;
