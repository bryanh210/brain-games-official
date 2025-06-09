import { useSelector } from "react-redux";
import { RootState } from '@repo/store';

export const useGameState = () => {
    const game = useSelector((state: RootState) => state.game);
    console.log('🚨 current game state:', game);

    const moveNumber = useSelector((state: RootState)  => state.game.moveNumber);
    const startingMoves = useSelector((state: RootState)  => state.game.startingMoves);

    return { moveNumber, startingMoves }
}