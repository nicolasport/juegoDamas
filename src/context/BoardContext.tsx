import { createContext } from 'react';
import {Board, Pawn} from "src/logicGameClases/gameLogicClass";

export interface IstateContext {
    VirtualState: [],
    memo: [],
    sizeBoardX: number,
    sizeBoardY: number,
    cellSize: number,
    playerTurn: 'white' | 'black',
    selectedDisc: Pawn | null,
    availablePlaces: number|boolean[],
    pointsWhitePlayer: number,
    pointsBlackPlayer: number,
    keepMov: boolean,
    cantDiscPerPlayer: number,
    timePlayer: 'white' | 'black',
    board: Board,
    checkPlayerTurn: Function,
    checkMovement: Function,
    movDisc: Function
    winPlayer: null | string
}




const BoardContext = createContext<Partial<IstateContext>>({});

export default BoardContext;
