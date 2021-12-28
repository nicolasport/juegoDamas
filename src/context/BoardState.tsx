import React from 'react';
 import useBoard from 'src/hook/UseBoard';
import BoardContext from 'src/context/BoardContext';
import {Coordinate, Pawn, King} from "../logicGameClases/gameLogicClass";


const BoardState = (props:any) => {
    const { children } = props;
    const [state, /*_dispatch*/, board, actionsDispatch] = useBoard();


    const endTurn = (keepMov: boolean) => {
        // avaliablePlaces
        actionsDispatch.setAvPlaces(board.get_emptyAvPlaces())

        if (!keepMov) {
            // change player
            let playerToPlay = null;
            if (state.timePlayer === 'white') {
                playerToPlay = 'black';
            } else {
                playerToPlay = 'white';
            }
            actionsDispatch.setPlayerTurn(playerToPlay)

            // reset selectedDisc
            actionsDispatch.setSelectedDisc(null)

        }else{
            checkMovement(state.selectedDisc)
        }
    };

    const checkPlayerTurn = (piece: Pawn) => {
        if(piece.color === state.timePlayer){
            // Resetea los lugares de movimiento
            actionsDispatch.setAvPlaces(board.avPlaces)
            // Sube al estado el disco seleccionado
            if(!state.keepMov){
                actionsDispatch.setSelectedDisc(piece)
            }
        }

    }

    const checkMovement = (piece: Pawn | King) => {
        let avPlaces:any = []

        avPlaces = board.checkAvPlaces(piece)

        actionsDispatch.setAvPlaces(avPlaces)
    }

    const movDisc = (newPosition: Coordinate) => {
        const { selectedDisc } = state;
        const eatEnemy = board.eatEnemy(selectedDisc, newPosition)
        // Borra el disco de la posicion anterior y Mueve el disco a su nueva posicion
        board.movPiece(selectedDisc, newPosition)

        let keepMov = false
        //Check if te cell to mov is the end of Board for Pawn
        if(selectedDisc.rol === 'Pawn' && board.checkArriveEndCellOfBoard(newPosition)){
            //convert to King
            board.memo[newPosition.x][newPosition.y] = new King(selectedDisc.color, newPosition)
        }else{
            //Check if can eat again
            if(eatEnemy){
                if(board.checkEatAgain(selectedDisc)){
                    keepMov = true
                }
            }
        }

        //verifica que puedan moverse las fichas del enemigo
        console.log("-> board.checkAllPiecesCantMove(state.timePlayer)", board.checkAllPiecesCantMove(state.timePlayer)=== 0);
        if(board.checkAllPiecesCantMove(state.timePlayer) === 0){
            console.log("PLAYER WIN", state.timePlayer)
            actionsDispatch.setWinPlayer(state.timePlayer)
        }
        if(eatEnemy){
            actionsDispatch.addPlayerPoints(selectedDisc.color)
        }
        // Adhiere el movimiento al estado
        actionsDispatch.setBoard(board.memo)

        actionsDispatch.setKeepMov(keepMov)

        endTurn(keepMov);


    }


    return (
        <BoardContext.Provider key="board.state" value={
            {
                memo: board.memo,
                sizeBoardX: state.sizeBoardX,
                sizeBoardY: state.sizeBoardY,
                cellSize: state.cellSize,
                timePlayer: state.timePlayer,
                selectedDisc: state.selectedDisc,
                availablePlaces: state.availablePlaces,
                pointsWhitePlayer: state.pointsWhitePlayer, //TODO corregir
                pointsBlackPlayer: state.pointsBlackPlayer, //TODO corregir
                keepMov: false,
                cantDiscPerPlayer: 0, //TODO corregir
                board,
                checkPlayerTurn,
                checkMovement,
                movDisc,
                winPlayer: state.winPlayer,
            }
        }
        >
            {children}
        </BoardContext.Provider>
    );
};


export default BoardState;