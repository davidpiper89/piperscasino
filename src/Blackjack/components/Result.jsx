import React, { useState, useEffect } from "react";
import ResultsModal from "./ResultsModal";
import axios from "axios";
import { getCookie } from "../../utils/GetCookie";

const Result = ({
  total,
  dealerTotal,
  resetGame,
  setBet,
  dealerEnd,
  playerEnd,
  playerCards,
  dealerCards,
  setChips,
  stake,
  setWins,
  setLoses,
  setDraws,
  chips,
  username,
}) => {
  const result = { win: "You win", lose: "You lose", draw: "Push" };
  const [outcome, setOutcome] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const determineHandOutcome = (
    handTotal,
    dealerTotal,
    stakeForHand,
    playerCards,
    dealerCards
  ) => {
    const isPlayerBlackJack = playerCards.length === 1 && handTotal === 21;
    const isDealerBlackJack = dealerCards.length === 2 && dealerTotal === 21;

    if (handTotal > 21) {
      return { result: result.lose, stakeResult: -stakeForHand };
    } else if (isDealerBlackJack && isPlayerBlackJack) {
      return { result: result.draw, stakeResult: 0 };
    } else if (isPlayerBlackJack && !isDealerBlackJack) {
      return { result: result.win, stakeResult: 1.5 * stakeForHand };
    } else if (dealerTotal === handTotal) {
      return { result: result.draw, stakeResult: 0 };
    } else if (dealerTotal > 21 || handTotal > dealerTotal) {
      return { result: result.win, stakeResult: stakeForHand };
    } else if (isDealerBlackJack || dealerTotal > handTotal) {
      return { result: result.lose, stakeResult: -stakeForHand };
    }
  };

  useEffect(() => {
    const newOutcome = [...outcome];
    for (let i = 0; i < 4; i++) {
      if (total[i] !== false) {
        const handOutcome = determineHandOutcome(
          total[i],
          dealerTotal[0],
          stake[i],
          playerCards[i],
          dealerCards
        );
        if (handOutcome) {
          newOutcome[i] = handOutcome;

          // Adjust chips based on the outcome
          if (handOutcome.result === result.win) {
            setChips((prevChips) => prevChips + handOutcome.stakeResult * 2);
          } else if (handOutcome.result === result.draw) {
            setChips((prevChips) => prevChips + handOutcome.stakeResult);
          }
        }
      }
    }
    setOutcome(newOutcome);
  }, [dealerEnd]);

  useEffect(() => {
    outcome.forEach((outcomeResult) => {
      if (outcomeResult.result === result.lose) {
        setLoses((prevLoses) => prevLoses + 1);
        updateBlackjackResults("lose", username);
      } else if (outcomeResult.result === result.win) {
        setWins((prevWins) => prevWins + 1);
        updateBlackjackResults("win", username);
      } else if (outcomeResult.result === result.draw) {
        setDraws((prevDraws) => prevDraws + 1);
        updateBlackjackResults("draw", username);
      }
    });
  }, [outcome]);

  const updateBlackjackResults = async (resultType, username) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `http://localhost:6001/update-blackjack-results/${username}`,
        { resultType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error updating blackjack results:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (outcome.length > 0 && playerEnd) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [outcome]);

  useEffect(() => {
    const updateBackend = async (newChipCount, username) => {
      const token = getCookie("token");
      try {
        const { data } = await axios.put(
          "http://localhost:6001/update-chips",
          { newChipCount, username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        localStorage.setItem("unsavedChipCount", newChipCount);
      }
    };
    updateBackend(chips, username);
  }, [chips]);

  useEffect(() => {
    localStorage.setItem("chips", chips);
  }, [chips]);

  const handleResetOutcome = () => {
    setOutcome([]);
    setShowModal(false);
  };

  return showModal ? (
    <ResultsModal
      resetGame={resetGame}
      setBet={setBet}
      resetOutcome={handleResetOutcome}
      results={outcome}
    />
  ) : null;
};

export default Result;
