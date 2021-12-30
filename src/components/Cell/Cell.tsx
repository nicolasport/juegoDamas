import React, {useCallback, useContext} from 'react';
import {Coordinate} from "src/class/gameLogicClass";
import * as Style from "src/components/styleComponents/Global.style";
import BoardContext from "src/context/BoardContext";

type TpropsCell = {
    cellCoordinate: { x:number, y:number },
    children: any,
    selected?:boolean
}

export const Cell = (props:TpropsCell) => {

    const {board, availablePlaces, movDisc} =  useContext(BoardContext)
    const {cellCoordinate, children, selected} = props
    const {cellSize} = board!

    const handleClickCell = useCallback(() => {
        movDisc!(new Coordinate(cellCoordinate.x, cellCoordinate.y));
    },[cellCoordinate.x, cellCoordinate.y, movDisc])



    // @ts-ignore TODO ver tsIgnored
    const isAvPlaces = availablePlaces!.length > 0
    // @ts-ignore TODO ver tsIgnored
    const isFreeCell =  availablePlaces?.[cellCoordinate.x][cellCoordinate.y]


    return (
            isAvPlaces
                    ?   <Style.Cell
                            //key={`Cell>>${cellCoordinate.x}-${cellCoordinate.y}`}
                            width={cellSize!-2}
                            height={cellSize!}
                            selected={selected!}
                            isFreeCell={isFreeCell}
                            row={cellCoordinate.x}
                            col={cellCoordinate.y}
                            onClick={isFreeCell ? ()=> handleClickCell() : ()=>null}
                        >

                            {children}

                        </Style.Cell>

                    : null //spin on load or Skeleton

        )
}

