import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { setDeck } from "./features/blackjackSlice";
import Interface from "./components/blackjack/interface/Interface"
// import { deck } from "./app/sampledata";

function App() {
  const dispatch = useDispatch();
  const getApiData = async () => {
    const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    const results = await axios.get(url);

  dispatch(setDeck(results.data.deck_id));
  };
  getApiData();


  // const drawCard = (arr) => {
  //   const cardIndex = Math.floor(Math.random() * arr.length);

  //   const card = arr[cardIndex]
  //   return card
  // };


  return (
    <>
      {/* <BrowserRouter></BrowserRouter> */}
      <Interface />
    </>
  );
}

export default App;
