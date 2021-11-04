/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import '~/scss/Disc.scss';

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
                rol === 'king' ? style.fill = 'black' : ''
                return style

            case 'black':
                style.background = 'black'
                rol === 'king' ? style.fill = 'white' : ''
                return style

        }

    }
const king = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
    return (
        <div className="bone" onClick={() => handleClick(pos.x, pos.y)} style={styleFicha(color)}>{rol === 'king' ? king : '' }</div>
    )
}