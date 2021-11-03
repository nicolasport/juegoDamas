/* eslint-disable */
import PropTypes from 'prop-types'; // ES6
import React, {useEffect, useCallback} from 'react';
import '~/scss/Cell.scss'

export const Cell = (props) => {


    const {posX, posY, cellSize, children, avaliablePlaces, movDisc, memo, selectedDisc, playerColor} = props

    useEffect(() => {
    },[])

    function checkpair(row, col, avaliablePlaces) {
        let cell = {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
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

            //console.log(cell)
        }

        return cell
    }

    const handleClickCell = useCallback(() => {
        movDisc(posX, posY, memo, selectedDisc, playerColor)
    },[memo, selectedDisc, playerColor])

    if(avaliablePlaces){
        const color = checkpair(posX, posY, avaliablePlaces[posX][posY])

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

Cell.propTypes = {
    posX: PropTypes.number,
    posY: PropTypes.number,
    cellSize: PropTypes.number,
    avaliablePlaces: PropTypes.array,
    movDisc: PropTypes.func.isRequired,
    memo: PropTypes.array,
    selectedDisc: PropTypes.object,
    playerColor: PropTypes.string,
}