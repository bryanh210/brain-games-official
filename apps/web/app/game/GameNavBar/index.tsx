'use client';
import { useEffect } from 'react';
import { useGameState } from '../hooks/sliceHook';

export default function GameNavBar() {
    const { moveNumber, startingMoves } = useGameState();
    useEffect(() => {
        console.log('GameNavBar re-rendered', { moveNumber, startingMoves });
      }, [moveNumber, startingMoves]);
      console.log('GameNavBar rendering', { moveNumber, startingMoves });
    // button state
    return (
        <div className="gameNav flex justify-between">
             <span>{moveNumber}/{startingMoves}</span>
        </div>
    )
}