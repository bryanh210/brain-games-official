import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: { level: 1, score: 0 },
  reducers: {
    resetGame: (state) => { state.level = 1; state.score = 0; },
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
