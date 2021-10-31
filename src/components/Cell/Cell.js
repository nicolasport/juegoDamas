/* eslint-disable */
import React, {Fragment, useContext, useEffect} from 'react';
import '~/scss/Cell.scss'
import BoardContext from "~/context/Board/BoardContext";

export const Cell = (props) => {


    const {posX, posY, casillaSize, children, avaliablePlaces, movDisc} = props

    useEffect(() => {
        //console.log("AAV: ", avaliablePlaces)
    },avaliablePlaces,posX, posY,movDisc)

    function checkpair(row, col, avaliablePlaces) {
        var cell = {
            width: `${casillaSize}px`,
            height: `${casillaSize}px`,
            boxShadow: 'none'
        }
        if (row %  2 === 0) {
            if (col %  2 === 0){
                cell.background = 'white'

            }
            else{
                cell.background = '#a6a6a6'
            }
        }else {
            if (col %  2 === 0){ cell.background = '#a6a6a6' }
            else{ cell.background = 'white' }
        }
        if(avaliablePlaces === 'g'){
            cell.boxShadow = 'inset 0px 0px 10px #56ff00'
            cell.cursor = 'pointer'

            console.log(cell)
        }

        return cell
    }

    const handleClickCell = () => {
        movDisc(posX, posY)
        console.log(`MOVIMIENTO: ${posX} - ${posY}` )
    }

    if(avaliablePlaces){
        const color = checkpair(posX, posY, avaliablePlaces[posX][posY])

        avaliablePlaces[posX][posY] === 'g' ? console.log(avaliablePlaces) : ''
        return (
            avaliablePlaces[posX][posY] === 'g'
                ?   <li onClick={()=> handleClickCell()} className={'boneCell'} style={color} key={`${posX}-${posY}`}>{children}</li>
                :   <li className={'boneCell'} style={color} key={`${posX}-${posY}`}>{children}</li>

        )
    }else{
        const color = checkpair(posX, posY)
        return (
            <li className={'boneCell'} style={color} key={`${posX}-${posY}`}>{children}</li>
        )
    }
}