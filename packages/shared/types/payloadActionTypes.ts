export type Position = {
  x: number;
  y: number;
};

export type Sound = {
  id: string;
//   playedAt: Position;
};

export type CurrentPosAndSound = {
  currPosition: Position;
  currSound: Sound;
};

export type CurrentUserAction = {
    timestamp: number,
    posBoolean: boolean;
    soundBoolean: boolean;
    didAct: boolean;
}

export type CompareMoveAction = {
    machineMove: CurrentPosAndSound,
    currentUserAction: CurrentUserAction
}