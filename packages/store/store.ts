import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "@repo/slices";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
