'use client';
import './GameGrid.scss';

export default function GameGrid() {
    const createGrid = () => {
        const empty9SlotsArr = [...Array(9)];
        return (
            <div className='grid'>
                {empty9SlotsArr.map((__, indx) => {
                    return <div key ={indx} className='cell'/>
                })}
            </div>
        )
    }
    return (
       <>{createGrid()}</>
    )
}