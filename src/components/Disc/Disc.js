/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import '~/scss/Disc.scss';
import BoardContext from "~/context/Board/BoardContext";

export const Disc = (props) => {

   const {color, cellSize, pos, rol, checkPlayerTurn} = props

    useEffect(() =>{
    },[])

    const handleClick = (x, y) => {
        checkPlayerTurn(color, x, y, rol)
    }

    const styleFicha = (color) => {
        const style = {
            background: 'black',
            height: `${cellSize-25}px`,
            width: `${cellSize-25}px`,

        }
        switch (color) {
            case 'white':
                style.background = 'white'

                return style
            case 'black':
                style.background = 'black'
                return style

        }
    }

    return (
        <div className="bone" onClick={() => handleClick(pos.x, pos.y)} style={styleFicha(color)}></div>
    )
}