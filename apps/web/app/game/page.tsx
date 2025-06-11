'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

        const interval = setInterval(() => {
            setFlashIndex(getAutoFlashIndex);
            const randomAlphabetLetter = alphabetLetters[chooseRandomAlphabetIndx()];
            getAudio(randomAlphabetLetter);
        }, 2000);

        // kick in when dependency in array changes
        return () => clearInterval(interval);
    }, [inProgress]);

    useEffect(() => {
        const keyDown = (e) => {
            if(e.code === 'Space') {
                toggleGameState();
            }
        }

        window.addEventListener('keydown', keyDown)
        return () => window.removeEventListener('keydown', keyDown)
    }, []);

    // useEffect(() => {
    //     window.addEventListener('keydown', (e) => {
    //         if(e.code === 'Space') {
    //             toggleGameState();
    //         }
    //     })
    //     // is this correct
    //     return () => window.removeEventListener('keydown', (e) => {
    //         if(e.code === 'Space') {
    //             toggleGameState();
    //         }
    //     })
    // }, []);

    // const toggleGameState = () => {
    //     setInProgress(!inProgress);
    //     const currGameButtonState = !inProgress ? stop : start;
    //     setGameButtonText(currGameButtonState);
    // }

    const toggleGameState = () => {
        setInProgress(prev => {
            const newProgressState = !prev;
            const currGameButtonState = newProgressState ? stop : start;
            setGameButtonText(currGameButtonState);
            // why need to return
            return newProgressState;
        })
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