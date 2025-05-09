import { Position, Sound } from '../types/payloadActionTypes';
export declare const comparePosition: ({ pos1, pos2 }: {
    pos1: Position;
    pos2: Position;
}) => boolean;
export declare const compareSound: ({ sound1, sound2 }: {
    sound1: Sound;
    sound2: Sound;
}) => boolean;
export declare const calculateRealScore: ({ rawScore, startingMoves }: {
    rawScore: number;
    startingMoves: number;
}) => number;
//# sourceMappingURL=helper.d.ts.map