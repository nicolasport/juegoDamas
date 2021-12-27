import React, {useContext, useEffect, useRef} from 'react';
import Cell from 'src/components/Cell';
import Disc from 'src/components/Disc';
import * as Style from 'src/components/styleComponents/Global.style'
import BoardContext from "src/context/BoardContext";
import {Pawn, King, Coordinate} from "src/logicGameClases/gameLogicClass";
import {PointsTable} from "src/components/PointsTable/PointsTable"

export const Board = () => {
    const {
        sizeBoardY,
        sizeBoardX,
        cellSize,
        memo,
        selectedDisc,
        checkMovement,
        keepMov,
    } = useContext(BoardContext) ;
    const checkMovementRef = useRef(checkMovement!) //only to quit warning dependency []

    useEffect(()=> {
        if(selectedDisc !== null){
            checkMovementRef.current(selectedDisc, keepMov)
        }
    }, [selectedDisc, checkMovementRef,keepMov])

    const ifIsSelectedDisc = (x:number, y:number) => {
        if(selectedDisc){
            return selectedDisc!.coordinate.isEqual(new Coordinate(x, y))
        }
    }


    return (
        <>
            <Style.Board key={`BoardGame>`}
                         width={sizeBoardY! * cellSize!}
                         height={sizeBoardX! * cellSize!}
            >
                {memo!.map((row: [], x) =>
                    row.map((cellValue: 0 | Pawn | King, y: number) =>
                        <div key={`Cell>${x}-${y}`}>
                            <Cell
                                cellCoordinate={{x: x, y: y}}
                                selected={ifIsSelectedDisc(x, y)}
                            >
                                {cellValue ? <Disc piece={cellValue}/> : null}
                            </Cell>
                        </div>
                    )
                )}
            </Style.Board>
            <PointsTable/>
        </>
    )

}