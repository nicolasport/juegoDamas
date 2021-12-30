import React from 'react';
 import useBoard from 'src/hook/UseBoard';
import BoardContext from 'src/context/BoardContext';
import {Coordinate, Pawn, King} from "src/class/gameLogicClass";


const BoardState = (props:any) => {
    const { children } = props;
    const [state, /*_dispatch*/, board, actionsDispatch] = useBoard();


    const endTurn = (keepMov: boolean) => {
        // reset avaliablePlaces
        actionsDispatch.setAvPlaces(board.get_emptyAvPlaces())

        if (!keepMov) {
            // change player
            let playerToPlay = null;
            if (state.playerTurn === 'white') {
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

    const checkPlayerTurn = (piece: Pawn | King) => {
        if(piece.color === state.playerTurn){
            // Resetea los lugares de movimiento
            actionsDispatch.setAvPlaces(board.avPlaces)
            // Sube al estado el disco seleccionado
            if(!state.keepMov){
                actionsDispatch.setSelectedDisc(piece)
            }
        }

    }

    const checkMovement = (piece: Pawn | King) => {
        let avPlaces: Array <0|true>

        avPlaces = board.checkAvPlaces(piece)

        actionsDispatch.setAvPlaces(avPlaces)
    }

    const movDisc = (newPosition: Coordinate) => {
        const { selectedDisc } = state;
        const isEatEnemy = board.eatEnemy(selectedDisc, newPosition)

        // Borra el disco de la posicion anterior y Mueve el disco a su nueva posicion
        board.movPiece(selectedDisc, newPosition)

        let keepMov = false
        //Check if te cell to mov is the end of Board for Pawn
        if(selectedDisc.rol === 'Pawn' && board.checkArriveEndCellOfBoard(newPosition)){
            //Convert to King
            board.converToKing(selectedDisc)
        }else{
            //Check if can eat again
            if(isEatEnemy){
                if(board.checkEatAgain(selectedDisc)){
                    keepMov = true
                }
            }
        }

        console.log("-> board.checkAllPiecesCantMove(state.playerTurn)", board.getQtyOfEnemyPiecesCantMov(state.playerTurn)=== 0);
        if(board.getQtyOfEnemyPiecesCantMov(state.playerTurn) === 0){
            actionsDispatch.setWinPlayer(state.playerTurn)
        }
        if(isEatEnemy) actionsDispatch.addPlayerPoints(selectedDisc.color)

        // Adhiere el movimiento al estado memo y keepMov
        actionsDispatch.setBoard(board.memo)
        actionsDispatch.setKeepMov(keepMov)

        endTurn(keepMov);


    }


    return (
        <BoardContext.Provider value={
            {
                memo: board.memo,
                playerTurn: state.playerTurn,
                selectedDisc: state.selectedDisc,
                availablePlaces: state.availablePlaces,
                pointsWhitePlayer: state.pointsWhitePlayer,
                pointsBlackPlayer: state.pointsBlackPlayer,
                keepMov: state.keepMov,
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