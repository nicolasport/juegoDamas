import React, {useContext, useEffect, useRef} from 'react';
import Cell from 'src/components/Cell';
import Disc from 'src/components/Disc';
import * as Style from 'src/components/styleComponents/Global.style'
import BoardContext from "src/context/BoardContext";
import {Coordinate} from "src/class/gameLogicClass";
import {PointsTable} from "src/components/PointsTable/PointsTable"
import {TMemo} from "src/ts/types"

export const Board = () => {
    const {
        board,
        memo,
        selectedDisc,
        checkMovement,
        keepMov,
    } = useContext(BoardContext) ;
    const checkMovementRef = useRef(checkMovement!) //only to quit warning dependency []
    const {sizeX:sizeBoardX, sizeY:sizeBoardY, cellSize} = board!
    useEffect(()=> {
        if(selectedDisc !== null){
            checkMovementRef.current(selectedDisc!)
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
                {memo!.map((row: TMemo[], x: number) =>
                    row.map((cellValue: TMemo, y: number) =>
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