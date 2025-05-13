export default function GameNav() {
    return (
     <div className="gameNav flex justify-between">
         <span>${moveNumber} of {availableMoves}</span>
         <button>{buttonState}</button>
     </div>
    )
 }