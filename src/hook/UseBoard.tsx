import { useReducer } from 'react';
import BoardReducer from 'src/context/BoardReducer';
import {Board, Coordinate, Pawn, King, TyColor} from 'src/logicGameClases/gameLogicClass'
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

interface IState {
    memo: any[], // Memooria de las piezas del juego
    keepMov: boolean, // si puede seguir comento enemigos es true
    sizeBoardX: number, // Cantidad de columnas a lo alto del tablero
    sizeBoardY: number, // Cantidad de columnas a lo ancho del tablero
    sizeMatrizX: number,
    sizeMatrizY: number,
    cellSize?: number, // tamaño en px de cada celda
    pointsWhitePlayer: number,
    pointsBlackPlayer: number,
    cantDiscPerPlayer: number,
    timePlayer: Object | 'white' | 'black', // Blanco o Negro, es el jugador en turno
    selectedDisc: Pawn | null, // Disco que haas sido seleccionado
    availablePlaces: number|boolean[],
    winPlayer: null | TyColor
}


const sizeBoardX:number = 8 // Cantidad de columnas a lo alto del tablero
const sizeBoardY:number = 10 // Cantidad de columnas a lo ancho del tablero
const cellSize:number = 70 // tamaño en px de cada celda


const board = new Board(sizeBoardX, sizeBoardY);
// !TODO clear test config
board.memo[1][2] = 0
board.memo[0][1] = 0
board.memo[2][3] = 0
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
    sizeBoardX: board.sizeX,
    sizeBoardY: board.sizeY,
    sizeMatrizX: board.matrixSizeX,
    sizeMatrizY: board.matrixSizeY,
    cellSize,
    pointsWhitePlayer: 0,
    pointsBlackPlayer: 0,
    timePlayer: 'white',
    cantDiscPerPlayer: board.cantDiscPerPlayer,
    selectedDisc: null,
    availablePlaces: board.avPlaces,
    winPlayer: null
}
const useBoard = () => {
    const [state, dispatch] = useReducer(BoardReducer, initialState);

    const actionsDispatch = {
        setAvPlaces: (payload:any[]) => {
            dispatch({
                type: SET_AVAILABLE_PLACES,
                payload: payload,
            });
        },
        setSelectedDisc: (payload:Pawn|King|null) => {
            dispatch({
                type: SET_SELECTED_DISC,
                payload: payload,
            });
        },
        setPlayerTurn: (payload:'white'|'black') => {
            dispatch({
                type: SET_PLAYER_TURN,
                payload: payload,
            });
        },
        setBoard: (payload:Pawn|King|0[]) => {
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

