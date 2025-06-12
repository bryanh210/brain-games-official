import './MatchButton.scss';

export default function MatchButtons({setVisualButtonPressed, setIsSoundButtonPressed }) {
    return (
       <div className="matchButtons">
            <button onClick={() => setVisualButtonPressed(true)}>A key= Position Match</button>
            <button onClick={() => setIsSoundButtonPressed(true)}>L key = Audio Match</button>
       </div>
    )
}