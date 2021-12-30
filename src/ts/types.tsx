import {King, Pawn} from "../class/gameLogicClass";

export type TyColor = 'black' | 'white';
export type TPlayer = TyColor

export type TAvPlaces = 0 | true

export type TMemo = Pawn | King | 0

export type TSelDisc = null | Pawn | King

export type TObjSides = {
    'left':number,
    'right':number,
    'down':number,
    'top':number,
};
export type IActionType =
    'SET_SELECTED_DISC'
    |'SET_AVAILABLE_PLACES'
    |'SET_PLAYER_TURN'
    |'SET_BOARD_MOV'
    |'SET_KEEP_MOV'
    |'SET_WHITE_POINTS'
    |'SET_BLACK_POINTS'
    |'SET_WIN_PLAYER'

export type TSide = 'left' | 'top' | 'right' | 'down';
