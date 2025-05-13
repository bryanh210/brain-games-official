export var comparePosition = function (_a) {
    var pos1 = _a.pos1, pos2 = _a.pos2;
    return pos1.x === pos2.x && pos1.y === pos2.y;
};
export var compareSound = function (_a) {
    var sound1 = _a.sound1, sound2 = _a.sound2;
    return sound1.id === sound2.id;
};
// this return 1 to 100
export var calculateRealScore = function (_a) {
    var rawScore = _a.rawScore, startingMoves = _a.startingMoves;
    return Math.round((rawScore * 100) / startingMoves);
};
