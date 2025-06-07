'use client';
import { useState } from 'react';
import './global.scss';

import GameGrid from './GameGrid';
import MatchButtons from './MatchButtons';
import ResultTable from './ResultTable';

const start = 'start (space)';
const stop = 'stop (space)';

export default function GamePage() {
    const [ inProgress, setInProgress ] = useState(false);
    const [ gameButtonText, setGameButtonText ] = useState(start);

    const toggleGameState = () => {
        setInProgress(!inProgress);
        const currGameButtonState = inProgress ? stop : start;
        setGameButtonText(currGameButtonState);
    }

   return (
    <div className="gamePage">
        <div>Dual N-Back</div>
        <button 
            className={`gameButton ${gameButtonText === start ? '' : 'stopAnimation'}`}
            onClick={toggleGameState}
        >
            {gameButtonText}
        </button>
        <div className="gridMatchButtonsTable">
            <div className="gameGridMatchButtons">
                <GameGrid />
                <MatchButtons />
            </div>
            <ResultTable />
        </div>
    </div>
   )
}