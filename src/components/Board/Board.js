/* eslint-disable */
import React, {useState, useContext, useEffect} from 'react';
import Cell from '~/components/Cell';
import Disc from '~/components/Disc';
import '~/scss/Board.scss'
import BoardContext from "~/context/Board/BoardContext";

export const Board = (props) => {
    const {
        sizeBoardY,
        sizeBoardX,
        cellSize,
        memo,
        avaliablePlaces: availablePlaces,
        movDisc,
        checkMovement,
        selectedDisc,
        checkPlayerTurn,
        timePlayer,
    } = useContext(BoardContext);

    useEffect(()=> {
        if(selectedDisc.x !== null){
            checkMovement(selectedDisc.rol)
        }
    }, [selectedDisc])


    const styleBoard = {
            width: `${sizeBoardY*cellSize}px`,
            height: `${sizeBoardX*cellSize}px`,
        }
        let selected = false
        const render =
            <>
            <ul className={'boneBoard'} style={styleBoard}>
                {memo.map((row, indexRow) =>
                row.map((col, indexCol) =>
                <>
                {selectedDisc.x === indexRow && selectedDisc.y === indexCol ? selected = true : selected = false}
                    <Cell key={`Cell>${indexRow}-${indexCol}`}
                          pos={{x: indexRow, y:indexCol}}
                          cellSize={cellSize}
                          avaliablePlaces={availablePlaces}
                          movDisc={movDisc}
                          memo={memo}
                          selectedDisc={selectedDisc}
                          playerColor={timePlayer}
                          selected={selected}
                    >

                        {col !== 0 ?
                            <Disc key={`Disc>${indexRow}-${indexCol}`}
                                  rol={col.rol}
                                  color={col.color}
                                  pos={{x: indexRow, y:indexCol}}
                                  cellSize={cellSize}
                                  checkMovement={checkMovement}
                                  selectedDisc={selectedDisc}
                                  checkPlayerTurn={checkPlayerTurn}
                                  /> : ''}
                    </Cell>
                </>
                    )
                )}
            </ul>
            </>



    return render


}