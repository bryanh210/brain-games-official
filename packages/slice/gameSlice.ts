import { createSlice } from "@reduxjs/toolkit";

type Position = {
  x: number;
  y: number
}

type Sound = {
  id: string,
  playedAt: Position
}

type userAction = {
  timeStamp: number,
  sound: boolean,
  position: boolean
}

type GameState = {
  level: number,
  positionHistory: Position[],
  soundHistory: Sound[],
  score: number,
  userAction: userAction[],
  timeBeforeAnswer: number,
  successThreshold: number,
  latestAllowedResponseTime: number
}

const initialState: GameState = {
  level: 1,
  positionHistory: [],
  soundHistory: [],
  score: 0,
  userAction: [],
  timeBeforeAnswer: 1500,
  successThreshold: 80,
  latestAllowedResponseTime: 1498
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => { state.level = 1; state.score = 0; },
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
