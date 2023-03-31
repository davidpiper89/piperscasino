import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../app/initialState";

export const blackjackSlice = createSlice({
  name: "blackjack",
  initialState,

  reducers: {
    setGameStart: (state) => {
      state.started = !state.started;
    },
    setInitialCards: (state, action) => {
      const [card1, card2, card3, card4] = action.payload;
      state.playerCards.push(card1, card3);
      state.dealerCards.push(card2);
      state.dealerHidden.push(card4);
    },
    setRemainderDeck: (state, action) => {
      state.remainderDeck = action.payload;
    },
    setHitCard: (state, action) => {
      state.playerCards.push(action.payload);
    },
    setPlayerTotal: (state, action) => {
      state.playerTotal = action.payload;
    },
    setDealerTotal: (state, action) => {
      state.dealerTotal = action.payload;
    },
    setPlayerStand: (state) => {
      state.stand = !state.stand;
    },
    setPlayerDouble: (state) => {
      state.double = !state.double;
    },
    setDealerHidden: (state) => {
      console.log("i ran");
      state.dealerCards.push(state.dealerHidden[0]);
    },
    setDealerDrawn: (state, action) => {
      state.dealerCards.push(action.payload);
    },
    setDealerEnd: (state) => {
      state.dealerEnd = !state.dealerEnd;
    },
    setReset: (state, action) => {
      state.started = false;
      state.playerCards = [];
      state.dealerCards = [];
      state.dealerHidden = [];
      state.remainderDeck = [];
      state.playerTotal = "";
      state.dealerTotal = "";
      state.stand = false;
      state.double = false;
      state.dealerEnd = false;
    },
  },
});

export const {
  setGameStart,
  setInitialCards,
  setRemainderDeck,
  setHitCard,
  setPlayerTotal,
  setDealerTotal,
  setPlayerStand,
  setPlayerDouble,
  setDealerHidden,
  setDealerDrawn,
  setDealerEnd,
  setReset,
} = blackjackSlice.actions;

export default blackjackSlice.reducer;
