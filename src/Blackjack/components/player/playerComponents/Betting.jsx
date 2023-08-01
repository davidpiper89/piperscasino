import React from "react";

const Betting = ({ setBet, bet, setChips, chips, stake, setStake }) => {
  const placeBet = (amount) => {
    if (stake[0] + amount > chips) {
      alert("You cannot bet more than your available chips.");
    } else {
      setStake([stake[0] + amount, ...stake.slice(1)]);
    }
  };

  const undoBet = () => {
    setStake([0, ...stake.slice(1)]);
  };

  return (
    <>
      <div>
        <button
          className="bet-button cypress-bet-test"
          onClick={() => placeBet(1)}
        >
          Bet 1
        </button>
        <button className="bet-button" onClick={() => placeBet(5)}>
          Bet 5
        </button>
        <button className="bet-button" onClick={() => placeBet(10)}>
          Bet 10
        </button>
        <button className="bet-button" onClick={undoBet}>
          Clear
        </button>
      </div>
      <div className="bet-text">Total bet : {stake[0]}</div>

      <button
        className="confirm-button"
        onClick={() => {
          if (stake[0] > 0) {
            setBet(!bet);
            setChips(chips - stake[0]);
          } else {
            alert("Please place a bet before starting the game.");
          }
        }}
      >
        Confirm Bet
      </button>
    </>
  );
};

export default Betting;
