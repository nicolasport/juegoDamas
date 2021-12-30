/* eslint-disable */
import React, {useContext} from 'react';
import {Pawn} from "src/class/gameLogicClass";
import * as Style from "../styleComponents/Global.style";
import BoardContext from "../../context/BoardContext";


export const Disc = (props:any) => {

   const {board, checkPlayerTurn, keepMov, selectedDisc, playerTurn} =  useContext(BoardContext)
    const {piece} = props
    const {color, coordinate} = piece
    const {cellSize} = board!
    const rol = piece.constructor.name

    const handleClick = (piece: Pawn) => {
       if(( selectedDisc === null || !selectedDisc!.coordinate.isEqual(piece.coordinate) )
           && piece.color === playerTurn){
                checkPlayerTurn!(piece)
       }
   }

    const KingSVG =
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>

    let canClick = false
    if(keepMov){
        if(selectedDisc!.coordinate.isEqual(coordinate)){
            canClick = true
        }
    }else {
        canClick = true
    }
    return (
        <Style.Disc
            width={cellSize!-25}
            height={cellSize!-25}
            color={color}
            rol={rol}
            onClick={playerTurn===color && canClick ? () => handleClick(piece) : ()=>null}
            cursorOver={playerTurn===color && canClick}
        >

            {rol === 'King' ? KingSVG : '' }

        </Style.Disc>
    )
}