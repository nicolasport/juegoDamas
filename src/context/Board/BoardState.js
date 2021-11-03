import React from 'react';

import BoardContext from '~/context/Board/BoardContext';
import useBoard from '~/Hook/UseBoard';


const BoardState = (props) => {
  // BOARD GENERATOR FUNCTION
  const { children } = props;


  const initialState = {
    memo: [
      [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
      ['w', 0, 'w', 0, 'w', 0, 'w', 0, 'w', 0],
      [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['b', 0, 'b', 0, 'b', 0, 'b', 0, 'b', 0],
      [0, 'b', 0, 'b', 0, 'b', 0, 'b', 0, 'b'],
      ['b', 0, 'b', 0, 'b', 0, 'b', 0, 'b', 0],
    ],
    sizeBoardX: 8,
    sizeBoardY: 10,
    cellSize: 70,
    timePlayer: 'w',
    clickedDisc: {},
    selectedDisc: { x: null, y: null, rol: null },
    avaliablePlaces: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };
  const [state, dispatch] = useBoard();


  const endTurn = () => {
    let playerToPlay = null;
    if (state.timePlayer === 'w') {
      playerToPlay = 'b';
    } else {
      playerToPlay = 'w';
    }
    dispatch({
      type: 'SET_PLAYER_TURN',
      payload: playerToPlay,
    });
    // avaliablePlaces
    dispatch({
      type: 'SET_AVALIABLE_PLACES',
      payload: initialState.avaliablePlaces,
    });
    // selectedDisc
    dispatch({
      type: 'SET_SELECTED_DISC',
      payload: { x: null, y: null, rol: null },
    });
  };
  /*
  const EatOpponentDisc = (x, y) => {
    const virtualMemo = state.memo;
    console.log(`EAT OPPONNENT: ${virtualMemo[x][y]}`);
    virtualMemo[x][y] = 0;
    dispatch({
      type: 'SET_BOARD_MOV',
      payload: virtualMemo,
    });
  };
   */
  const movDisc = (newX, newY, memo, selectedDisc, playerColor) => {
    const virtualMemo = memo;
    virtualMemo[selectedDisc.x][selectedDisc.y] = 0;
    virtualMemo[newX][newY] = playerColor;
    endTurn();
    // ADHIERER EL MOVIMIENTO A LA MATRIZ
    dispatch({
      type: 'SET_BOARD_MOV',
      payload: virtualMemo,
    });
  };

  // MOVIMINETO DE PEON
  const peonMov = () => {
    const VirtualAvPlaces = state.avaliablePlaces;
    // BLANCO
    if (state.timePlayer === 'w') {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] === 0) {
          const left = {
            x: state.selectedDisc.x + 1,
            y: state.selectedDisc.y - 1,
          };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] === 'b' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y - 2] === 0) {
          // TODO chequear si come ficha
          VirtualAvPlaces[state.selectedDisc.x + 2][state.selectedDisc.y - 2] = 'g';
        }
      }
      // DERECHA
      if (state.selectedDisc.y + 1 <= state.sizeBoardY && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] === 0) {
          const right = {
            x: state.selectedDisc.x + 1,
            y: state.selectedDisc.y + 1,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] === 'b' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y + 2] === 0) {
          VirtualAvPlaces[state.selectedDisc.x + 2][state.selectedDisc.y + 2] = 'g';
        }
      }
    } /* NEGRO */ else {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) {
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] === 0) {
          const left = { x: state.selectedDisc.x - 1, y: state.selectedDisc.y - 1 };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] === 'w' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y - 2] === 0) {
          VirtualAvPlaces[state.selectedDisc.x - 2][state.selectedDisc.y - 2] = 'g';
        }
      }
      // DERECHA
      if (state.selectedDisc.y + 1 <= state.sizeBoardY && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) {
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] === 0) {
          const right = {
            x: state.selectedDisc.x - 1,
            y: state.selectedDisc.y + 1,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] === 'w' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y + 2] === 0) {
          VirtualAvPlaces[state.selectedDisc.x - 2][state.selectedDisc.y + 2] = 'g';
        }
      }
    }
    dispatch({
      type: 'SET_AVALIABLE_PLACES',
      payload: VirtualAvPlaces,
    });
  };

  // PINTA LUGARES A MOVER
  const checkMovement = (/* rol */) => {
    peonMov();
  };

  // CHEQUEA QUE SE CLICKEE EN LA FICHA DEL JUDARO DE TURNO
  const checkPlayerTurn = (color, x, y, rol) => {
    if (color === state.timePlayer) {
      dispatch({
        type: 'SET_AVALIABLE_PLACES',
        payload: initialState.avaliablePlaces,
      });
      // Sube al estado el disco seleccionado
      dispatch({
        type: 'SET_SELECTED_DISC',
        payload: { x, y, rol },
      });
      return;
    }
    alert(`TURNO DEL JUGADOR ${state.timePlayer === 'w' ? 'BLANCO' : 'NEGRO'}`);
  };

  /*
    const setMovement = () => {};
    const checkWin = () => {};
    const setPoint = () => {};
    */


  return (
    <BoardContext.Provider value={
        {
          VirtualState: state,
          memo: state.memo,
          sizeBoardX: state.sizeBoardX,
          sizeBoardY: state.sizeBoardY,
          cellSize: state.cellSize,
          timePlayer: state.timePlayer,
          selectedDisc: state.selectedDisc,
          avaliablePlaces: state.avaliablePlaces,
          checkPlayerTurn,
          movDisc,
          checkMovement,
        }
    }
    >
      {children}
    </BoardContext.Provider>
  );
};


export default BoardState;
