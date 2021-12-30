import { useReducer } from 'react';
import BoardReducer from 'src/context/BoardReducer';
import {Board, Coordinate, Pawn, King } from 'src/class/gameLogicClass'
import {
    SET_AVAILABLE_PLACES,
    SET_BOARD_MOV,
    SET_KEEP_MOV,
    SET_PLAYER_TURN,
    SET_SELECTED_DISC,
    SET_WHITE_POINTS,
    SET_BLACK_POINTS,
    SET_WIN_PLAYER
} from "../context/actionsTypes";
import {IActionCreator, IState} from "src/ts/interfaces";
import {TMemo, TPlayer, TSelDisc} from "../ts/types";


const sizeBoardX:number = 8 // Cantidad de columnas a lo alto del tablero
const sizeBoardY:number = 10 // Cantidad de columnas a lo ancho del tablero


const board = new Board(sizeBoardX, sizeBoardY);
// !TODO clear test config
// board.memo[1][2] = 0
// board.memo[0][1] = 0
// board.memo[2][3] = 0
// board.memo[0][3] = 0
// board.memo[0][5] = 0
// board.memo[0][7] = 0
// board.memo[0][9] = 0
// board.memo[1][0] = 0
// board.memo[1][2] = 0
// board.memo[1][4] = 0
// board.memo[1][6] = 0
// board.memo[1][8] = 0
board.memo[1][2] = new Pawn('black',new Coordinate(1,2))

const initialState:IState = {
    memo: board.memo,
    keepMov: false,
    pointsWhitePlayer: 0,
    pointsBlackPlayer: 0,
    playerTurn: 'white',
    selectedDisc: null,
    availablePlaces: board.avPlaces,
    winPlayer: null
}
const useBoard = () => {
    const [state, dispatch]:[IState, any] = useReducer(BoardReducer, initialState);

    const actionsDispatch:IActionCreator = {
        setAvPlaces: (payload:any[]) => {
            dispatch({
                type: SET_AVAILABLE_PLACES,
                payload: payload,
            });
        },
        setSelectedDisc: (payload:TSelDisc) => {
            dispatch({
                type: SET_SELECTED_DISC,
                payload: payload,
            });
        },
        setPlayerTurn: (payload:TPlayer) => {
            dispatch({
                type: SET_PLAYER_TURN,
                payload: payload,
            });
        },
        setBoard: (payload:TMemo) => {
            dispatch({
                type: SET_BOARD_MOV,
                payload: payload,
            });
        },
        setKeepMov: (payload:boolean) => {
            dispatch({
                type: SET_KEEP_MOV,
                payload: payload,
            });
        },
        addPlayerPoints: (color:string) => {
            if(color === 'white'){
                dispatch({
                    type: SET_WHITE_POINTS,
                    payload: color,
                });
            }else{
                dispatch({
                    type: SET_BLACK_POINTS,
                    payload: color,
                });
            }
        },
        setWinPlayer: (color:string) => {
            dispatch({
                type: SET_WIN_PLAYER,
                payload: color,
            });
        },
    }


    return [state, dispatch, board, actionsDispatch];
};

export default useBoard;

