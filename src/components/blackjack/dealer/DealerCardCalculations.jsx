import React, {useEffect} from "react";
import { ace, ten } from "../../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDealerDrawnCard, setDealerTotal } from "../../../features/blackjackSlice";

const DealerCardCalculations = (totalArray) => {
  const cards = totalArray.totalArray;
  const deck = useSelector((state) => state.blackjack.deckId);
  const dispatch = useDispatch()

  let dealerHighTotal = 0;
  let dealerLowTotal = 0;

  useEffect(() => {
    if (cards.length >= 2 && dealerHighTotal < 17) {
      drawCard();
    }
  }, [cards]);

  async function drawCard() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    const card = await axios.get(url);
    dispatch(setDealerDrawnCard(card.data.cards));
  }

  //dealer no aces
  if (!cards.includes(ace)) {
    dealerHighTotal = cards.reduce((a, b) => a + b, 0);
    dispatch(setDealerTotal(dealerHighTotal))
    return <div className="dealer_total">{dealerHighTotal}</div>;
  }

  //dealer has aces
  if (cards.includes(ace)) {
    const aces = [];
    const pushAces = (arr, item) => {
      cards.forEach((card) => {
        if (card === ace) {
          aces.push(card);
        }
      });
    };
    pushAces(cards, ace);
    if (aces.length === 1) {
      let sum = 0;
      cards.forEach((card) => {
        if (card !== ace) {
          sum += card;
        }
      });
      dealerHighTotal = aces[0].high + sum;
      dealerLowTotal = aces[0].low + sum;
      if(dealerHighTotal>21){
        dealerHighTotal = dealerLowTotal
      }
      dispatch(setDealerTotal(dealerHighTotal))
      return (
        <div className="dealer_total">
          {dealerHighTotal > 21 ? dealerLowTotal : dealerHighTotal}
        </div>
      );
    }
  }
};

export default DealerCardCalculations;
