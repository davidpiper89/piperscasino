import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { RandomCardPicker } from "../../utils/RandomCardPicker";
import { setHitCard, setRemainderDeck } from "../../features/blackjackSlice";

const Hit = () => {
  const dispatch = useDispatch();
  const remainderDeck = useSelector((state) => state.blackjack.remainderDeck);
  const deck = [...remainderDeck];

  const playerHit = (deck) => {
    const hit = RandomCardPicker(deck);
    const hitCard = hit.card;
    const remainingCards = hit.array;

    dispatch(setHitCard(hitCard));
    dispatch(setRemainderDeck(remainingCards));
  };
  return (
    <Button onClick={() => playerHit(deck)} className="btn btn-primary btn-sm">
      Hit
    </Button>
  );
};

export default Hit;
