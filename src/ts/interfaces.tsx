import {Board, Coordinate, King, Pawn} from "src/class/gameLogicClass";
import {TyColor, TMemo, TPlayer, TAvPlaces, TSelDisc, IActionType} from 'src/ts/types'


export interface IState {
    memo: TMemo[][], // Memory of pieces game
    keepMov: boolean, // True if can Eat again
    pointsWhitePlayer: number,
    pointsBlackPlayer: number,
    playerTurn: TPlayer, // Player in turn
    selectedDisc: TSelDisc, //Selected disc by user
    availablePlaces: Array <TAvPlaces>, //Matrix of available places to mov of Selected Disc
    winPlayer: null | TyColor
}

export interface IStateContext extends IState{
    keepMov: boolean,
    board: Board,
    checkPlayerTurn: (piece: Pawn | King) => void,
    checkMovement: (piece: Pawn | King) => void,
    movDisc: (newPosition: Coordinate) => void
}



export interface IActionCreator {
    setAvPlaces: (payload:any[]) => void,
    setSelectedDisc: (payload:TSelDisc) => void,
    setPlayerTurn: (payload:TPlayer) => void,
    setBoard: (payload:TMemo) => void,
    setKeepMov: (payload:boolean) => void,
    addPlayerPoints: (color:string) => void,
    setWinPlayer: (color:string) => void,
}

export interface IAction {
    type: IActionType,
    payload: any
}