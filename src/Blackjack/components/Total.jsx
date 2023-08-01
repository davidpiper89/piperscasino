import React, { useEffect } from "react";

import { cardConverterToTotals } from "../utils/cardConverter";
import { totalCalc } from "../utils/totalCalc";

const Total = ({ hand, handIndex, total, setTotal }) => {
  useEffect(() => {
    if (hand) {
      const handTotals = cardConverterToTotals(hand);
      const { total: handTotal } = totalCalc(handTotals); 

      if (total[handIndex] !== handTotal) {
        setTotal((prevState) => {
          const newTotal = [...prevState];
          newTotal.splice(handIndex, 1, handTotal);
          return newTotal;
        });
      }
    }
  }, [hand, handIndex]);

  return (
    <>
      <p className="total">{total[handIndex]}</p>
    </>
  );
};

export default Total;
