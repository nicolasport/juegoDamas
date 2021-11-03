/* eslint-disable */
import PropTypes from 'prop-types'; // ES6
import React, {useEffect, useCallback} from 'react';
import '~/scss/Cell.scss'

export const Cell = (props) => {


    const {pos, cellSize, children, avaliablePlaces, movDisc, memo, selectedDisc, playerColor, selected} = props

    useEffect(() => {
    },[])

    function checkpair(row, col, avaliablePlaces, selected) {
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
        if(selected === true){
            cell.boxShadow = 'rgb(0 78 255) 0px 0px 10px inset'
        }
        if(avaliablePlaces === 'g'){
            cell.boxShadow = 'inset 0px 0px 10px #56ff00'
            cell.cursor = 'pointer'
        }

        return cell
    }
    const handleClickCell = useCallback(() => {
        movDisc(pos.x, pos.y, memo, selectedDisc, playerColor, selectedDisc.rol)
    },[pos.x, pos.y, memo, selectedDisc, playerColor])


    if(avaliablePlaces){
        const color = checkpair(pos.x, pos.y, avaliablePlaces[pos.x][pos.y], selected)

        return (
            avaliablePlaces[pos.x][pos.y] === 'g'
                ?   <li onClick={()=> handleClickCell()} className={'boneCell'} style={color} key={`${pos.x}-${pos.y}`}>{children}</li>
                :   <li className={'boneCell'} style={color} key={`${pos.x}-${pos.y}`}>{children}</li>

        )
    }else{
        const color = checkpair(pos.x, pos.y)

        return (
            <li className={'boneCell'} style={color} key={`${pos.x}-${pos.y}`}>{children}</li>
        )
    }
}

Cell.propTypes = {
    pos: PropTypes.object,
    cellSize: PropTypes.number,
    avaliablePlaces: PropTypes.array,
    movDisc: PropTypes.func.isRequired,
    memo: PropTypes.array,
    selectedDisc: PropTypes.object,
    playerColor: PropTypes.string,
}