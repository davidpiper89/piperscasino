import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../app/initialState";

export const blackjackSlice = createSlice({
  name: "blackjack",
  initialState,

  reducers: {
    setReset: (state) => {
      state.dealerFaceCards = [];
      state.dealerHidden = [];
      state.playerCards = [];
      state.playerCardTotals = 0;
      state.playerTotal = 0;
      state.dealerTotal = 0;
      state.playerBlackjack = false;
      state.dealerBlackjack = false;
      state.double = false;
      state.stand = false;
      state.dealerEndGo = false;
    },
    setDeck: (state, action) => {
      state.deckId = action.payload;
    },
    setCards: (state, action) => {
      state.playerCards.push(action.payload[0]);
      state.dealerFaceCards.push(action.payload[1]);
      state.playerCards.push(action.payload[2]);
      state.dealerHidden.push(action.payload[3]);
    },
    setPlayerDrawnCard: (state, action) => {
      state.playerCards.push(action.payload[0]);
    },
    setPlayerCardTotals: (state, action) => {
      state.playerCardTotals = action.payload;
    },
    setPlayerTotal: (state, action) => {
      state.playerTotal = action.payload;
    },
    setDealerTotal: (state, action) => {
      state.dealerTotal = action.payload;
    },
    setPlayerBlackjack: (state, action) => {
      state.playerBlackjack = action.payload;
    },
    setDealersHand: (state, action) => {
      state.dealerFaceCards.push(action.payload);
    },
    setDealerDrawnCard: (state, action) => {
      state.dealerFaceCards.push(action.payload[0]);
    },
    setDealerBlackjack: (state, action) => {
      state.dealerBlackjack = action.payload;
    },
    setPlayerStand: (state) => {
      state.stand = !state.stand;
    },
    setPlayerDouble: (state, action) => {
      state.double = action.payload;
    },
    setPlayerFirstSplit: (state, action) => {
      const newArray = state.playerCards.splice(1)
      state.splitOnceCards = newArray
    },
    setDealerEndGo: (state, action) => {
      state.dealerEndGo = action.payload;
    },
  },
});

export const {
  setReset,
  setDeck,
  setCards,
  setPlayerDrawnCard,
  setPlayerCardTotals,
  setPlayerTotal,
  setDealerTotal,
  setPlayerBlackjack,
  setDealersHand,
  setDealerDrawnCard,
  setDealerBlackjack,
  setPlayerStand,
  setPlayerDouble,
  setPlayerFirstSplit,
  setDealerEndGo,
} = blackjackSlice.actions;

export default blackjackSlice.reducer;
