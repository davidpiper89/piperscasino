import React, { useState, useMemo } from "react";
import { deck } from "./utils/deck";
import Result from "./components/Result";
import DealerInterface from "./components/dealer/DealerInterface";
import PlayerInterface from "./components/player/PlayerInterface";
import "./Blackjack.css";
import InfoButton from "./components/InfoButton";
import { HomeButton } from "../components/loggedIn/HomeButton";
import Header from "../components/loggedIn/Header";

const Blackjack = ({
  chips,
  setChips,
  username,
  wins,
  setWins,
  loses,
  setLoses,
  draws,
  setDraws,
  UID,
}) => {
  const deckStart = useMemo(() => [...deck], []);
  const [bet, setBet] = useState(false);
  const [playerCards, setPlayerCards] = useState([[]]);
  const [remainingDeck, setDeck] = useState();
  const [dealerCards, setDealerCards] = useState();
  const [dealerHidden, setDealerHidden] = useState();
  const [split, setSplit] = useState(0);
  const [playerEnd, setPlayerEnd] = useState(false);
  const [dealerEnd, setDealerEnd] = useState(false);
  const [stand, setStand] = useState([false, false, false, false]);
  const [double, setDouble] = useState([false, false, false, false]);

  const [stake, setStake] = useState([0, 0, 0, 0]);
  const [total, setTotal] = useState([false, false, false, false]);
  const [bust, setBust] = useState([false, false, false, false]);
  const [blackjack, setBlackjack] = useState([false, false, false, false]);

  const [dealerTotal, setDealerTotal] = useState([0]);

  const resetGame = () => {
    setPlayerEnd(false);
    setDealerEnd(false);
    setDealerCards();
    setPlayerCards([[]]);
    setSplit(0);
    setTotal([false, false, false, false]);
    setBust([false, false, false, false]);
    setStand([false, false, false, false]);
    setDouble([false, false, false, false]);
    setStake([0, 0, 0, 0]);
    setBlackjack([false, false, false, false]);
    setDealerTotal([0]);
    setBet(false);
  };


  return (
    <>
      <div
        fluid="true"
        className="d-flex flex-column align-items-center mediaContainer"
      >
        <Header
          title="Piper's BlackJack"
          leftIcon={<HomeButton />}
          rightContent={<InfoButton wins={wins} loses={loses} draws={draws} />}
        />
        
        <>
          <DealerInterface
            dealerCards={dealerCards}
            dealerHidden={dealerHidden}
            remainingDeck={remainingDeck}
            setDealerCards={setDealerCards}
            setDeck={setDeck}
            dealerTotal={dealerTotal}
            setDealerTotal={setDealerTotal}
            bet={bet}
            playerEnd={playerEnd}
            dealerEnd={dealerEnd}
            setDealerEnd={setDealerEnd}
            bust={bust}
            split={split}
            blackjack={blackjack}
            setPlayerEnd={setPlayerEnd}
          />
          <PlayerInterface
            playerCards={playerCards}
            remainingDeck={remainingDeck}
            setPlayerCards={setPlayerCards}
            setDeck={setDeck}
            split={split}
            setSplit={setSplit}
            deckStart={deckStart}
            setDealerCards={setDealerCards}
            setDealerHidden={setDealerHidden}
            chips={chips}
            setChips={setChips}
            stake={stake}
            setStake={setStake}
            total={total}
            setTotal={setTotal}
            blackjack={blackjack}
            setBlackjack={setBlackjack}
            bust={bust}
            setBust={setBust}
            resetGame={resetGame}
            bet={bet}
            setBet={setBet}
            playerEnd={playerEnd}
            setPlayerEnd={setPlayerEnd}
            stand={stand}
            setStand={setStand}
            double={double}
            setDouble={setDouble}
          />
        </>
        <Result
          total={total}
          dealerTotal={dealerTotal}
          resetGame={resetGame}
          setBet={setBet}
          dealerEnd={dealerEnd}
          playerEnd={playerEnd}
          playerCards={playerCards}
          dealerCards={dealerCards}
          setChips={setChips}
          stake={stake}
          bust={bust}
          set={setBust}
          stand={stand}
          double={double}
          blackjack={blackjack}
          wins={wins}
          setWins={setWins}
          loses={loses}
          setLoses={setLoses}
          draws={draws}
          setDraws={setDraws}
          chips={chips}
          username={username}
          UID={UID}
          split={split}
        />
        <footer></footer>
      </div>
    </>
  );
};

export default Blackjack;
