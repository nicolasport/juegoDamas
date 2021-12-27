import React, {useContext} from 'react';
import BoardContext from "../../context/BoardContext";


export const PointsTable = () => {
    const {cantDiscPerPlayer, pointsWhitePlayer, pointsBlackPlayer, timePlayer } = useContext(BoardContext)
    return <div style={{display: "block", marginTop: "60px"}}>
        {pointsWhitePlayer === cantDiscPerPlayer
            ? <h1>White Player Win</h1>
            : pointsBlackPlayer === cantDiscPerPlayer
                ? <h1>Black Player Win</h1>
                : <div>
                    <h1>Player's turn: {timePlayer!.toUpperCase()}</h1>
                    <h1>Points of White Player: {pointsWhitePlayer}</h1>
                    <h1>Points of Black Player: {pointsBlackPlayer}</h1>
                </div>
        }
    </div>;
}