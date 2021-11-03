/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import '~/scss/Disc.scss';
import BoardContext from "~/context/Board/BoardContext";

export const Disc = (props) => {

   const {color, cellSize, posY, posX, rol, checkMovement, selectedDisc, checkPlayerTurn} = props

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
            case 'w':
                style.background = 'white'

                return style
            case 'b':
                style.background = 'black'
                return style

        }
    }

    return (
        <div className="bone" onClick={() => handleClick(posX, posY)} style={styleFicha(color)}></div>
    )
}