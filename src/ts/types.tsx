import {King, Pawn} from "../class/gameLogicClass";

export type TyColor = 'black' | 'white';
export type TPlayer = TyColor | null

export type TAvPlaces = 0 | true


export type TMemo = Pawn | King | 0

export type TSelDisc = null | Pawn | King

export type TObjSides = {
    'left':number,
    'right':number,
    'down':number,
    'top':number,
};

export type TAction =
      { type: 'SET_SELECTED_DISC', payload: TSelDisc}
    | { type: 'SET_AVAILABLE_PLACES', payload: TAvPlaces[][] }
    | { type: 'SET_PLAYER_TURN', payload: TPlayer }
    | { type: 'SET_BOARD_MOV', payload: TMemo[][] }
    | { type:'SET_KEEP_MOV', payload: boolean }
    | { type: 'SET_WHITE_POINTS', payload: number }
    | { type: 'SET_BLACK_POINTS', payload: number }
    | { type: 'SET_WIN_PLAYER', payload: TPlayer }


export type TSide = 'left' | 'top' | 'right' | 'down';
