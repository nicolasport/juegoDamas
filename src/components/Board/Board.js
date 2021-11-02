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
        avaliablePlaces,
        placeToMov,
        movDisc,
        checkMovement,
        selectedDisc,
        checkPlayerTurn
    } = useContext(BoardContext);

    useEffect(()=> {
        //console.log('avaliablePlaces: ', avaliablePlaces)
        //console.log('Memo: ', memo)
        //setMemoGame(memo)
    }, [avaliablePlaces, memo, placeToMov])


    const styleBoard = {
            width: `${sizeBoardY*cellSize}px`,
            height: `${sizeBoardX*cellSize}px`,
        }

    return (
            <ul className={'boneBoard'} style={styleBoard}>

                {memo.map((row, indexRow) =>
                    row.map((col, indexCol) =>
                        //{console.log(`(${indexRow},${indexCol}) ==> ${col}`)}
                        <Cell posX={indexRow} posY={indexCol} casillaSize={cellSize} avaliablePlaces={avaliablePlaces} movDisc={movDisc}>
                            {col !== 0 ?
                                <Disc rol={'peon'} color={col} posX={indexRow} posY={indexCol} casillaSize={cellSize} checkMovement={checkMovement} selectedDisc={selectedDisc} checkPlayerTurn={checkPlayerTurn}/> : ''}
                        </Cell>
                    )
                )}

            </ul>
    )

}