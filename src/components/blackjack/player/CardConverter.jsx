import { useSelector, useDispatch } from "react-redux";
import { setPlayerCardTotals } from "../../../features/blackjackSlice";
import CardCalculations from "./CardCalculations";
import { ace, ten } from "../../../utils/config";

const CardConverter = () => {
  const cards = useSelector((state) => state.blackjack.playerCards);
  const dispatch = useDispatch();

  // const [cardTotals, setTotals] = useState([]);

  let cardTotals = [];

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

  return <CardCalculations />;
};

export default CardConverter;
