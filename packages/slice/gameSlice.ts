import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position, Sound, CurrentPosAndSound, CompareMoveAction } from '../shared/types/payloadActionTypes';
import { comparePosition, compareSound } from '../shared/utilities/helper';

export type userAction = {
  timeStamp: number,
  sound: boolean,
  position: boolean
}

export type GameState = {
  level: number,
  positionHistory: Position[],
  soundHistory: Sound[],
  score: number,
  userAction: userAction[],
  timeBeforeAnswer: number,
  successThreshold: number,
}

const initialState: GameState = {
  level: 1,
  positionHistory: [],
  soundHistory: [],
  score: 0,
  userAction: [],
  timeBeforeAnswer: 1500,
  successThreshold: 80,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => { state.level = 1; state.score = 0; },
    // this is machine move
    addMove:(state, action: PayloadAction<CurrentPosAndSound>) => {
      state.positionHistory.push(action.payload.currPosition);
      state.soundHistory.push(action.payload.currSound);
    },
    compareMove:(state, action:PayloadAction<CompareMoveAction>) => {
      /*
        1) If time since last move <= current time (handled in local component)
        _ get the current position and the position from history length - level
        _ get the current sound and the sound from history length - level
        _get the user current action, particularly the positionBoolean and soundBoolean

        2) conditions:
        true conditions:
          +) if the UCA (User Current Action) is true for soundBoolean AND positionBoolean AND curr pos matches history pos
          AND curr sound matches history sound
          +)if the UCA is true for soundBoolean AND curr pos matches history pos 
          AND positionBoolean is false AND curr pos does not matches history pos 
          +)if the UCA is true for positionBoolean AND curr sound matches history sound 
          AND soundBoolean is false AND currSound does not matches history sound

        false conditions:
          +) if the UCA is true for soundBoolean and position AND curr pos doesn't match history pos
          AND curr sound doesn't match history sound
          +) if UCA is true for posBoolean AND curr pos doesn't match history pos
          +) if UCA is true for soundBoolean AND currSound doesn't match history sound
          +) if UCA is false for posBoolean AND curr pos matches history pos
          +) if UCA is false for soundBoolean AND curr sound matches history sound
      */

    }
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
