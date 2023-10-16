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
    if (outcome.length === 1 && outcome[0] === "You lose") {
      setLoses((prevLoses) => prevLoses + 1);
      updateBlackjackResults("lose", username);
    }
    if (outcome.length === 1 && outcome[0] === "You win") {
      setWins((prevWins) => prevWins + 1);
      updateBlackjackResults("win", username);
    }
    if (outcome.length === 1 && outcome[0] === "Push") {
      setDraws((prevDraws) => prevDraws + 1);
      updateBlackjackResults("draw", username);
    }
  }, [outcome]);

  const handleResetOutcome = () => {
    setOutcome([]);
    setShowModal(false);
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
    let newOutcome = [...outcome];
    for (let i = 0; i < 4; i++) {
      if (total[i] !== false) {
        const isPlayerBlackJack =
          playerCards[i][0].length === 2 && total[i] === 21;
        const isDealerBlackJack =
          dealerCards.length === 2 && dealerTotal[0] === 21;

        if (total[i] > 21) {
          newOutcome[i] = { result: result.lose, stakeResult: -stake[i] };
        } else if (isDealerBlackJack && isPlayerBlackJack) {
          newOutcome[i] = { result: result.draw, stakeResult: 0 };
          setChips((prevChips) => prevChips + stake[i]);
        } else if (isPlayerBlackJack && !isDealerBlackJack) {
          newOutcome[i] = { result: result.win, stakeResult: 1.5 * stake[i] };
          setChips((prevChips) => prevChips + 2.5 * stake[i]);
        } else if (dealerTotal[0] === total[i] && dealerEnd) {
          newOutcome[i] = { result: result.draw, stakeResult: 0 };
          setChips((prevChips) => prevChips + stake[i]);
        } else if (dealerEnd) {
          if (dealerTotal[0] > 21 || total[i] > dealerTotal[0]) {
            newOutcome[i] = { result: result.win, stakeResult: stake[i] };
            setChips((prevChips) => prevChips + 2 * stake[i]);
          } else if (isDealerBlackJack || dealerTotal[0] > total[i]) {
            newOutcome[i] = { result: result.lose, stakeResult: -stake[i] };
          }
        }
      }
    }
    setOutcome(newOutcome);
  }, [dealerEnd]);

  useEffect(() => {
    localStorage.setItem("chips", chips);
  }, [chips]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
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
