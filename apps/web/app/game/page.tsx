'use client';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './global.scss';

import { addMove } from '@repo/slices';
import GameGrid from './GameGrid';
import MatchButtons from './MatchButtons';
import ResultTable from './ResultTable';

import { getAutoFlashIndex, getAudio, alphabetLetters, chooseRandomAlphabetIndx } from './utilities/gameLogic';

const start = 'start (space)';
const stop = 'stop (space)';
const TOTAL_MOVES = 3;

export default function GamePage() {
    const [ inProgress, setInProgress ] = useState(false);
    const [ gameButtonText, setGameButtonText ] = useState(start);
    const [ flashIndex, setFlashIndex ] = useState(null);
    const [ letter, setLetter ] = useState(null);
    const [isSoundButtonPressed, setIsSoundButtonPressed] = useState(false);
    const [isVisualButtonPressed, setVisualButtonPressed] = useState(false);
    // have to use this because useDispatch() will return a hook function
    const dispatch = useDispatch();

    const currPos = useRef(null);
    const currSound = useRef(null);
    const moveNumber = useRef(0);
    const isSoundButtonPressedRef = useRef(false);
    const isVisualButtonPressedRef = useRef(false);

    let userAction = useRef({
        timeStamp: null,
        sound: null,
        position: null,
        didAct: null
    })

    // take note
    useEffect(() => {
        isSoundButtonPressedRef.current = isSoundButtonPressed;
        isVisualButtonPressedRef.current = isVisualButtonPressed;
    }, [isSoundButtonPressed, isVisualButtonPressed])

    useEffect(() => {
        if(!inProgress) return;

        const interval = setInterval(() => {      
            //  TOTAL_MOVES - 1 because moveNumber.current++ updates the number at the end first
            if(moveNumber.current > TOTAL_MOVES - 1) {
                clearInterval(interval);
                setInProgress(false);
                setGameButtonText(start);
                setIsSoundButtonPressed(false);
                setVisualButtonPressed(false);
                setFlashIndex(null);
                setLetter(null);
                currPos.current = null;
                currSound.current = null;
                moveNumber.current = 0;
                isSoundButtonPressedRef.current = false;
                isVisualButtonPressedRef.current = false;
                return;
            }
            const randomAlphabetLetter = alphabetLetters[chooseRandomAlphabetIndx()];
            const flashIndex = getAutoFlashIndex();
            getAudio(randomAlphabetLetter);
            setLetter(randomAlphabetLetter);
            setFlashIndex(flashIndex);

            currPos.current = flashIndex;
            currSound.current = randomAlphabetLetter;
            
            dispatch(addMove({
                currPos: currPos.current,
                currSound: currSound.current,
                // currUserAction: userAction.current,
                currUserAction: { ...userAction.current },
                moveNumber: moveNumber.current
            }));

            userAction.current = {
                timeStamp: null,
                sound: null,
                position: null,
                didAct: null
            }

            moveNumber.current++;

        }, 2000);

        // kick in when dependency in array changes
        return () => clearInterval(interval);
    }, [inProgress]);

    useEffect(() => {
        const timeStamp = Date.now();
    
        const keyDown = (e) => {
            if(e.code === 'Space') {
                toggleGameState();
            }

            if(e.code === 'a' || isVisualButtonPressedRef) {
                // ref returns an object with key current
                userAction.current.position = true;
                userAction.current.didAct = true;
                userAction.current.timeStamp = timeStamp;
            }

            if(e.code === 'l' || isSoundButtonPressedRef) {
                userAction.current.sound = true;
                userAction.current.didAct = true;
                userAction.current.timeStamp = timeStamp;
            }
        }

        window.addEventListener('keydown', keyDown)
        return () => window.removeEventListener('keydown', keyDown)
    }, []);

    const toggleGameState = () => {
        setInProgress(prev => {
            const newProgressState = !prev;
            const currGameButtonState = newProgressState ? stop : start;
            setGameButtonText(currGameButtonState);
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
        <span className="moveNumber">Move {moveNumber.current} of {TOTAL_MOVES}</span>
        <div className="gridMatchButtonsTable">
            <div className="gameGridMatchButtons">
                <GameGrid flashIndex={flashIndex} />
                <MatchButtons setVisualButtonPressed={setVisualButtonPressed} setIsSoundButtonPressed={setIsSoundButtonPressed}/>
            </div>
            <ResultTable />
        </div>
    </div>
   )
}