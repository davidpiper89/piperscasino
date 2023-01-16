import { configureStore } from '@reduxjs/toolkit';
import blackjackReducer from '../features/blackjackSlice';

export const store = configureStore({
  reducer: {
   blackjack: blackjackReducer,
  },
});
