import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../app/initialState";

export const blackjackSlice = createSlice({
  name: "blackjack",
  initialState,

  reducers: {
    setDeck: (state, action) => {
      state.deckId = action.payload;
    },
    setCards: (state, action) => {
      state.playerCards.push(action.payload[0]);
      state.dealerCards.push(action.payload[1]);
      state.playerCards.push(action.payload[2]);
      state.dealerHidden.push(action.payload[3]);
    },
    setDrawnCard: (state, action) => {
      state.playerCards.push(action.payload[0]);
    },
    setTotal: (state, action) => {
      state.playerTotal = action.payload
    }
  },
});

export const { setDeck, setCards, setDrawnCard, setTotal } = blackjackSlice.actions;

export default blackjackSlice.reducer;
