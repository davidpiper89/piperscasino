import { useSelector, useDispatch } from "react-redux";
import {
  setPlayerCardTotals,
  setDealerTotal,
} from "../../../features/blackjackSlice";
import CardCalculations from "./CardCalculations";
import { ace, ten } from "../../../utils/config";

const CardConverter = () => {
  const cards = useSelector((state) => state.blackjack.playerCards);
  const dealersFaceCard = useSelector(
    (state) => state.blackjack.dealerFaceCards
  );
  const dispatch = useDispatch();

  // const [cardTotals, setTotals] = useState([]);

  let cardTotals = [];
  let dealerCardTotal = [];


  const playerNumberCard = (cards) => {
    cards.forEach((card) => {
      if (card.value === "ACE") {
        return cardTotals.push(ace);
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
  playerNumberCard(cards);
  dispatch(setPlayerCardTotals(cardTotals));


  const dealerNumberCard = (card) => {
    card.forEach((card) => {
      if (card.value === "ACE") {
        return dealerCardTotal.push(ace);
      }
      if (
        card.value === "KING" ||
        card.value === "QUEEN" ||
        card.value === "JACK"
      ) {
        return dealerCardTotal.push(ten);
      }
      return dealerCardTotal.push(Number(card.value));
    });
  };

  dealerNumberCard(dealersFaceCard);
  dispatch(setDealerTotal(dealerCardTotal));

  return <CardCalculations />
};

export default CardConverter;
