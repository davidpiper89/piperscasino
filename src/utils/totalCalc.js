import { ace } from "./config";
export const totalCalc = (totalsArr) => {
  let highTotal = 0;
  let lowTotal = 0;
  if (totalsArr.length === 2 && totalsArr[0] === ace && totalsArr[1] === 10) {
    highTotal = 21;
    return highTotal;
  } else if (
    totalsArr.length === 2 &&
    totalsArr[0] === 10 &&
    totalsArr[1] === ace
  ) {
    highTotal = 21;
    return highTotal;
  } else if (!totalsArr.includes(ace)) {
    highTotal = totalsArr.reduce((a, b) => a + b, 0);
    return highTotal;
  } else if (totalsArr.includes(ace)) {
    const aces = [];
    const pushAces = (arr, item) => {
      totalsArr.forEach((total) => {
        if (total === ace) {
          aces.push(total);
        }
      });
    };
    pushAces(totalsArr, ace);
    // 1 aces
    if (aces.length === 1) {
      let sum = 0;
      totalsArr.forEach((total) => {
        if (total !== ace) {
          sum += total;
        }
      });
      highTotal = aces[0].high + sum;
      lowTotal = aces[0].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      return highTotal;
      // 2 aces
    } else if (aces.length === 2) {
      let sum = 0;
      totalsArr.forEach((total) => {
        if (total !== ace) {
          sum += total;
        }
      });
      highTotal = aces[0].high + aces[1].low + sum;
      lowTotal = aces[0].low + aces[1].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      return highTotal;

      //3 aces
    } else if (aces.length === 3) {
      let sum = 0;
      totalsArr.forEach((total) => {
        if (total !== ace) {
          sum += total;
        }
      });
      highTotal = aces[0].high + aces[1].low + aces[2].low + sum;
      lowTotal = aces[0].low + aces[1].low + aces[2].low + sum;
      if (highTotal > 21) {
        highTotal = lowTotal;
      }
      return highTotal;
    } 
    //  4 aces
      else if (aces.length === 4) {
        let sum = 0;
        totalsArr.forEach((total) => {
          if (total !== ace) {
            sum += total;
          }
        });
        highTotal = aces[0].high + aces[1].low + aces[2].low + aces[3].low + sum;
        lowTotal = aces[0].low + aces[1].low + aces[2].low + aces[3].low + sum;
        if (highTotal > 21) {
          highTotal = lowTotal;
        }
        return highTotal
      
    }
  }
};
