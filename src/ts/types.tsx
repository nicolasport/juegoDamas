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

export type TSide = 'left' | 'top' | 'right' | 'down';
