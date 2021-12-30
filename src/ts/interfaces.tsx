import {Board, Coordinate, King, Pawn} from "src/class/gameLogicClass";
import {TMemo, TPlayer, TAvPlaces, TSelDisc} from 'src/ts/types'


export interface IState {
    memo: TMemo[][], // Memory of pieces game
    keepMov: boolean, // True if can Eat again
    pointsWhitePlayer: number,
    pointsBlackPlayer: number,
    playerTurn: TPlayer, // Player in turn
    selectedDisc: Pawn | King | null, //Selected disc by user
    availablePlaces: TAvPlaces[][], //Matrix of available places to mov of Selected Disc
    winPlayer: TPlayer
}

export interface IStateContext extends IState{
    keepMov: boolean,
    board: Board,
    checkPlayerTurn: (piece: Pawn | King) => void,
    checkMovement: (piece: Pawn | King) => void,
    movDisc: (newPosition: Coordinate) => void
}

export interface IActionCreator {
    setAvPlaces: (payload:TAvPlaces[][]) => void,
    setSelectedDisc: (payload:TSelDisc) => void,
    setPlayerTurn: (payload:TPlayer) => void,
    setBoard: (payload:any[] /*TODO fix any type*/) => void,
    setKeepMov: (payload:boolean) => void,
    addPlayerPoints: (color:string) => void,
    setWinPlayer: (color:TPlayer) => void,
}
