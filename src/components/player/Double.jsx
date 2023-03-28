import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import {
  setPlayerDouble,
  setRemainderDeck,
  setHitCard,

} from "../../features/blackjackSlice";

const Double = () => {
  const dispatch = useDispatch();
  const remainderDeck = useSelector((state) => state.blackjack.remainderDeck);
  const deck = [...remainderDeck];

  const doubleDown = (deck) => {
    const double = RandomCardPicker(deck);
    const doubleCard = double.card;
    const remainingCards = double.array;

    dispatch(setPlayerDouble());
    dispatch(setHitCard(doubleCard));
    dispatch(setRemainderDeck(remainingCards));

  };

  return (
    <Button
      onClick={() => {
        doubleDown(deck);
      }}
      className="btn btn-warning btn-sm"
    >
      Double
    </Button>
  );
};

export default Double;
