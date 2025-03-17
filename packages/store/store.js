import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slice/gameSlice";
export var store = configureStore({
    reducer: {
        game: gameReducer,
    },
});
