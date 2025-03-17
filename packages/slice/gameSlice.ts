import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position, Sound, CurrentPosAndSound, CompareMoveAction } from '../shared/types/payloadActionTypes';
import { comparePosition, compareSound, calculateRealScore } from '../shared/utilities/helper';

const getStartingMove = (n: number): number => {
  if(n < 1) return 20;
  // return the multiply of n + 20
  return Math.ceil(20/n) * n;
}

const isAbove80 = score => score >= 80;
const isBelow60 = score => score <= 60;

export type userAction = {
  timeStamp: number,
  sound: boolean,
  position: boolean
}

export type GameState = {
  level: number,
  positionHistory: Position[],
  soundHistory: Sound[],
  rawScore: number,
  realScore: number,
  scoreHistory: number[],
  userAction: userAction[],
  timeBeforeAnswer: number,
  successThreshold: number,
  moveCount: number,
  startingMoves: number
}

const initialState: GameState = {
  level: 1,
  positionHistory: [],
  soundHistory: [],
  rawScore: 0,
  realScore: 0,
  scoreHistory: [],
  userAction: [],
  timeBeforeAnswer: 1500,
  successThreshold: 80,
  moveCount: 0,
  startingMoves: getStartingMove(1)
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    /*  
      Separate logic into 3:
      1) Compare moves to see if the move matches and call the end game reducer
      when we reach the end of the startingMoves
      2) Add the score to the state that has length of 2
      3) If the user score above 80 on all, then bump the level up
      4) If the user score under 60 on all, decrease the level unless level is alr 1
      5) update startingMoves
      6) HERE: calculate the score correctly percentage wise
    */
    resetGame: (state) => { state.level = 1; state.score = 0; },
    // this is machine move
    addMove:(state, action: PayloadAction<CurrentPosAndSound>) => {
      state.positionHistory.push(action.payload.currPosition);
      state.soundHistory.push(action.payload.currSound);
    },
    endGame:(state) => {
      state.positionHistory = [];
      state.soundHistory = [];
      state.userAction = [];
      state.moveCount = 0;
      const realScore = calculateRealScore({rawScore: state.rawScore, startingMoves: state.startingMoves});
      if(state.scoreHistory.length <= 3) {
        state.scoreHistory.push(realScore);
      } else {
        state.scoreHistory.pop()
      }

      // bump level up or down and bump starting move accordingly
      if(state.scoreHistory.every(isAbove80)) {
        state.level++;
      } else if(state.scoreHistory.every(isBelow60)) {
        state.level--;
      }

      state.startingMoves = getStartingMove(state.level);
    },
    compareMove:(state, action:PayloadAction<CompareMoveAction>) => {
      if(state.moveCount > state.startingMoves) {
        // end the game
        gameSlice.caseReducers.endGame(state);
      }
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
      const historicPos = state.positionHistory[state.positionHistory.length - state.level - 1];
      const historicSound = state.soundHistory[state.soundHistory.length - state.level - 1];
      const currPos = state.positionHistory[state.positionHistory.length - 1];
      const currSound = state.soundHistory[state.soundHistory.length - 1];
      const CSAPosBoolean = action.payload.currentUserAction.posBoolean;
      const CSASoundBoolean = action.payload.currentUserAction.soundBoolean;

      const fullMatch = CSAPosBoolean && CSASoundBoolean && comparePosition({ pos1: historicPos, pos2:currPos }) && compareSound({ sound1: historicSound, sound2: currSound});
      const partialMatch = CSAPosBoolean && comparePosition({ pos1: historicPos, pos2:currPos }) || CSASoundBoolean && compareSound({ sound1: historicSound, sound2: currSound});
      const isMatch = fullMatch || partialMatch;

      if(isMatch) {
        state.rawScore = state.rawScore + 1;
      } else {
        state.rawScore = state.rawScore - 1;
      }

      state.moveCount++;
    }
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
