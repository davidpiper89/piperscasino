import React, { useEffect, useMemo } from "react";
import Betting from "./playerComponents/Betting";
import PlayerHoleCards from "./playerComponents/PlayerHoleCards";
import Chips from "./playerComponents/Chips";
import Hit from "./playerComponents/Hit";
import Stand from "./playerComponents/Stand";
import Double from "./playerComponents/Double";
import Split from "./playerComponents/Split";
import Total from "../Total";
import Bet from "./playerComponents/Bet";
import "./Player.css";
import { cardConverterToTotals } from "../../utils/cardConverter";
import { totalCalc } from "../../utils/totalCalc";

// Checks if the player's turn has ended, considering all hands are either blackjack, bust, stand, double. takes into account split.

export const isAllHandsOver = (
  playerCards,
  stand,
  double,
  total,
  blackjack,
  bust,
  split
) => {
  let allHandsOver = playerCards.every(
    (_, index) =>
      stand[index] ||
      (double[index] && total[index] <= 21) ||
      blackjack[index] ||
      bust[index] ||
      total[index] === 21
  );

  if (split > 0) {
    allHandsOver = allHandsOver && playerCards.length === split + 1;
  }

  return allHandsOver;
};

export const PlayerInterface = ({
  playerCards,
  remainingDeck,
  setPlayerCards,
  setDeck,
  split,
  setSplit,
  chips,
  setChips,
  stake,
  setStake,
  total,
  setTotal,
  blackjack,
  setBlackjack,
  bust,
  setBust,
  bet,
  setBet,
  playerEnd,
  setPlayerEnd,
  stand,
  setStand,
  double,
  setDouble,
}) => {
  // Checks and updates if a player has blackjack.

  const updateBlackjackStatus = () => {
    const flatPlayerCards = playerCards.flat();
    flatPlayerCards.forEach((hand, handIndex) => {
      if (
        !blackjack[handIndex] &&
        hand.length === 2 &&
        total[handIndex] === 21
      ) {
        const newBlackjack = [...blackjack];
        newBlackjack[handIndex] = true;
        setTimeout(() => setBlackjack(newBlackjack), 0);
      }
    });
  };

  // Updates player's bust and total based on current hand value.

  const updateBustAndTotal = () => {
    const flatPlayerCards = playerCards.flat();
    flatPlayerCards.forEach((hand, handIndex) => {
      const handTotals = cardConverterToTotals(hand);
      const { total: handTotal, softAce } = totalCalc(handTotals);
      if (!bust[handIndex] && handTotal > 21 && !softAce) {
        const newBust = [...bust];
        newBust[handIndex] = true;
        setBust(newBust);
      }
      if (total[handIndex] !== handTotal) {
        setTotal((prevState) => {
          const newTotal = [...prevState];
          newTotal.splice(handIndex, 1, handTotal);
          return newTotal;
        });
      }
    });
  };

  useEffect(() => {
    if (
      bet &&
      !playerEnd &&
      playerCards.length > 0 &&
      playerCards.length <= 4 &&
      isAllHandsOver(playerCards, stand, double, total, blackjack, bust, split)
    ) {
      setPlayerEnd(true);
    }
  }, [
    bet,
    playerCards,
    playerEnd,
    stand,
    double,
    bust,
    blackjack,
    total,
    split,
  ]);

  useEffect(updateBlackjackStatus, [playerCards, total, blackjack]);
  useEffect(updateBustAndTotal, [playerCards, bust, total]);

  // Determines the CSS class for grid based on the split value.

  const gridClass = useMemo(() => {
    switch (split) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
      default:
        return "0";
    }
  }, [split]);

  const PlayerHandsDisplay = () => {
    return playerCards.flatMap((hands, handIndex) => {
      return hands.map((hand) => {
        const canSplit =
          hand.length === 2 && hand[0].value === hand[1].value && split < 3;

        const showControls =
          bet &&
          !stand[handIndex] &&
          !double[handIndex] &&
          !bust[handIndex] &&
          !blackjack[handIndex] &&
          total[handIndex] !== 21 &&
          total[handIndex] < 21;

        return (
          <div
            key={`${handIndex}-${hand.card}`}
            className={`d-flex flex-column`}
          >
            <div className="d-flex justify-content-center align-items-center cardsContainer">
              <PlayerHoleCards hand={hand} gridClass={gridClass} />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Total
                hand={hand}
                handIndex={handIndex}
                total={total}
                setTotal={setTotal}
              />
              <Bet
                hand={hand}
                handIndex={handIndex}
                stake={stake}
                setStake={setStake}
              />
              {showControls && (
                <div className="d-flex">
                  <Hit
                    remainingDeck={remainingDeck}
                    setDeck={setDeck}
                    setPlayerCards={setPlayerCards}
                    handIndex={handIndex}
                    playerCards={playerCards}
                  />
                  <Stand
                    handIndex={handIndex}
                    playerCards={playerCards}
                    stand={stand}
                    setStand={setStand}
                  />
                  {hand && hand.length < 3 && (
                    <Double
                      remainingDeck={remainingDeck}
                      setDeck={setDeck}
                      playerCards={playerCards}
                      setPlayerCards={setPlayerCards}
                      handIndex={handIndex}
                      double={double}
                      setDouble={setDouble}
                      stake={stake}
                      setStake={setStake}
                      chips={chips}
                      setChips={setChips}
                      setTotal={setTotal}
                    />
                  )}
                  {canSplit && (
                    <Split
                      remainingDeck={remainingDeck}
                      setDeck={setDeck}
                      setPlayerCards={setPlayerCards}
                      hand={hand}
                      playerCards={playerCards}
                      handIndex={handIndex}
                      split={split}
                      setSplit={setSplit}
                      stake={stake}
                      setStake={setStake}
                      chips={chips}
                      setChips={setChips}
                      blackjack={blackjack}
                      setBlackjack={setBlackjack}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        );
      });
    });
  };

  return (
    <>
      {!bet && (
        <Betting
          setBet={setBet}
          bet={bet}
          setChips={setChips}
          chips={chips}
          stake={stake}
          setStake={setStake}
        />
      )}
      <div className={`split${gridClass}`}>{bet && <PlayerHandsDisplay />}</div>
      <Chips chips={chips} />
    </>
  );
};

export default PlayerInterface;
