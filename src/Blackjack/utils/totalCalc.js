import { ace } from "./config";

export const totalCalc = (totalsArr) => {
  const aceCount = totalsArr.filter((total) => total === ace).length;
  const nonAceTotal = totalsArr
    .filter((total) => total !== ace)
    .reduce((a, b) => a + b, 0);

  let total = nonAceTotal + aceCount;

  let softAce = false;
  if (aceCount > 0 && total + 10 <= 21) {
    total += 10;
    softAce = true;
  }

  return { total, softAce };
};

