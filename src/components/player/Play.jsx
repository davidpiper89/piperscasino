import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { deck } from "../../app/deck";

import { beginGame } from "../../utils/beginGame";
import {
  setInitialCards,
  setRemainderDeck,
  setGameStart,
} from "../../features/blackjackSlice";

const Play = () => {
  const dispatch = useDispatch();
  const deckStart = [...deck];

  const startGame = (deck) => {
    const start = beginGame(deck);
    dispatch(setGameStart());
    dispatch(setInitialCards(start.initialCards));
    dispatch(setRemainderDeck(start.deck4));
  };

  return (
    <>
      <Button onClick={() => startGame(deckStart)} variant="primary">
        Play
      </Button>
    </>
  );
};

export default Play;
