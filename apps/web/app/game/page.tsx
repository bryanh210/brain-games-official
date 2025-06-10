'use client';
import { useState, useEffect } from 'react';
import './global.scss';

import GameGrid from './GameGrid';
import MatchButtons from './MatchButtons';
import ResultTable from './ResultTable';

import { getAutoFlashIndex, getAudio, alphabetLetters, chooseRandomAlphabetIndx } from './utilities/gameLogic';

const start = 'start (space)';
const stop = 'stop (space)';

export default function GamePage() {
    const [ inProgress, setInProgress ] = useState(false);
    const [ gameButtonText, setGameButtonText ] = useState(start);
    const [ flashIndex, setFlashIndex ] = useState(null);

    useEffect(() => {
        if(!inProgress) return;
        console.log(inProgress, 'inProgress')
        const interval = setInterval(() => {
            setFlashIndex(getAutoFlashIndex);
            const randomAlphabetLetter = alphabetLetters[chooseRandomAlphabetIndx()];
            getAudio(randomAlphabetLetter);
        }, 2000);

        // kick in when dependency in array changes
        return () => clearInterval(interval);
    }, [inProgress])

    const toggleGameState = () => {
        setInProgress(!inProgress);
        const currGameButtonState = !inProgress ? stop : start;
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
                <GameGrid flashIndex={flashIndex} />
                <MatchButtons />
            </div>
            <ResultTable />
        </div>
    </div>
   )
}