import React, {useContext} from 'react';
import BoardContext from "../../context/BoardContext";


export const PointsTable = () => {
    const {winPlayer, pointsWhitePlayer, pointsBlackPlayer, playerTurn } = useContext(BoardContext)
    return (
        winPlayer === null ?
            <div style={{display: "block", marginTop: "60px"}}>
                <div>
                    <h1>Player's turn: {playerTurn!.toUpperCase()}</h1>
                    <h1>Points of White Player: {pointsWhitePlayer}</h1>
                    <h1>Points of Black Player: {pointsBlackPlayer}</h1>
                </div>
            </div>

        : <div style={{display: "block", marginTop: "60px"}}>
                <h1>
                    WIN PLAYER IS: {winPlayer!.toUpperCase()}
                </h1>
                <div>
                    <h1>Player's turn: {playerTurn!.toUpperCase()}</h1>
                    <h1>Points of White Player: {pointsWhitePlayer}</h1>
                    <h1>Points of Black Player: {pointsBlackPlayer}</h1>
                </div>
          </div>
    )
}