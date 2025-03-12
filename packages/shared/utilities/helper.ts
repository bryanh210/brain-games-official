import { Position, Sound } from '../types/payloadActionTypes'

export const comparePosition = ({ pos1, pos2 }: { pos1:Position, pos2: Position }) => {
    return pos1.x === pos2.x && pos1.y === pos2.y
};

export const compareSound = ({ sound1, sound2 }: { sound1:Sound, sound2: Sound }) => {
    return sound1.id === sound2.id
};