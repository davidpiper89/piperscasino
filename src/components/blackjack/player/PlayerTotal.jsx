import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotal } from "../../../features/blackjackSlice";
// import { numberCard } from "../../../utils/utils";

const PlayerTotal = () => {
  const cards = useSelector((state) => state.blackjack.playerCards);
  const dispatch = useDispatch();
  // const [cardTotals, setTotals] = useState([]);

  let cardTotals = [];

  const numberCard = (cards) => {
    cards.forEach((card) => {
      const ace = { high: 11, low: 1 };
      const ten = 10;
      if (card.value === "ACE") {
        return cardTotals.push(ace.high);
      }
      if (
        card.value === "KING" ||
        card.value === "QUEEN" ||
        card.value === "JACK"
      ) {
        return cardTotals.push(ten);
      }
      return cardTotals.push(Number(card.value));
    });
  };
  numberCard(cards);

  let playerTotal = cardTotals.reduce((a, b) => a + b, 0);

  dispatch(setTotal(playerTotal));


  if (playerTotal > 21) {
    playerTotal = "Bust";
  }

  return <div>{playerTotal === 0 ? "" : playerTotal}</div>;
};

export default PlayerTotal;
