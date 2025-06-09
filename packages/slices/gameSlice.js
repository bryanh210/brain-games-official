import { createSlice } from "@reduxjs/toolkit";
var gameSlice = createSlice({
    name: "game",
    initialState: { level: 1, score: 0 },
    reducers: {
        resetGame: function (state) { state.level = 1; state.score = 0; },
    },
});
export var resetGame = gameSlice.actions.resetGame;
export default gameSlice.reducer;
