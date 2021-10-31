import React, { useReducer } from 'react';
import BoardReducer from './BoardReducer';
import BoardContext from '~/context/Board/BoardContext';

const BoardState = (props) => {
  // BOARD GENERATOR FUNCTION
  const { children } = props;

  const initialState = {
    memo: [
      [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
      ['w', 0, 'w', 0, 'w', 0, 'w', 0, 'w', 0],
      [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
      [0, 0, 'b', 0, 0, 0, 0, 0, 0, 0],
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
    placeToMov: { x: null, y: null },
  };

  // REDUCER
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const endTurn = () => {
    // placeToMov
    dispatch({
      type: 'SET_NEW_MOV',
      payload: { x: null, y: null },
    });
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

  const movDisc = (newX, newY) => {
    console.log(`movDisc: newX=> ${newX}, newY=>${newY}`);
    console.log(`state.selectedDisc.x=> ${state.selectedDisc.x}`);
    console.log(`state.selectedDisc.y=> ${state.selectedDisc.y}`);
    console.log(`state.timePlayer=> ${state.timePlayer}`);

    dispatch({
      type: 'SET_NEW_MOV',
      payload: { x: newX, y: newY },
    });

    const virtualMemo = state.memo;
    console.log(`virtualMemo=> ${virtualMemo}`);
    virtualMemo[state.selectedDisc.x][state.selectedDisc.y] = 0;
    virtualMemo[state.placeToMov.x][state.placeToMov.y] = state.timePlayer;
    endTurn();
    // ADHIERER EL MOVIMIENTO A LA MATRIZ
    dispatch({
      type: 'SET_BOARD_MOV',
      payload: virtualMemo,
    });
  };
  // MOVIMINETO DE PEON
  const peonMov = () => {
    if (state.timePlayer === 'w') {
      // BLANCO
      // izq
      const avPlaces = state.avaliablePlaces;
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] === 0) {
          const left = {
            x: state.selectedDisc.x + 1,
            y: state.selectedDisc.y - 1,
          };
          avPlaces[left.x][left.y] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        } else if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] === 'b' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y - 2] === 0) {
          avPlaces[state.selectedDisc.x + 2][state.selectedDisc.y - 2] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        }
      }
      // derecha
      if (state.selectedDisc.y + 1 <= state.sizeBoardX && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] === 0) {
          const right = {
            x: state.selectedDisc.x + 1,
            y: state.selectedDisc.y + 1,
          };
          avPlaces[right.x][right.y] = 'g';
        } else if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] === 'b' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y + 2] === 0) {
          avPlaces[state.selectedDisc.x + 2][state.selectedDisc.y + 2] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        }
      }
    } else { // NEGRO
      const avPlaces = state.avaliablePlaces;
      // IZQ
      // si no se pasa del tablero
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) {
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] === 0) {
          const left = {
            x: state.selectedDisc.x - 1,
            y: state.selectedDisc.y - 1,
          };
          avPlaces[left.x][left.y] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] === 'w' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y - 2] === 0) {
          avPlaces[state.selectedDisc.x - 2][state.selectedDisc.y - 2] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        }
      }
      // derecha
      if (state.selectedDisc.y + 1 <= state.sizeBoardX && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) { // si no se pasa del tablero
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] === 0) {
          const right = {
            x: state.selectedDisc.x - 1,
            y: state.selectedDisc.y + 1,
          };
          avPlaces[right.x][right.y] = 'g';
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] === 'w' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y + 2] === 0) {
          avPlaces[state.selectedDisc.x - 2][state.selectedDisc.y + 2] = 'g';
          dispatch({
            type: 'SET_AVALIABLE_PLACES',
            payload: avPlaces,
          });
        }
      }
    }
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


      return true;
    }
    console.log('NO ES VALIDO');
    return false;
  };

  /*
    const setMovement = () => {};
    const checkWin = () => {};
    const setPoint = () => {};
    */


  return (
    <BoardContext.Provider value={
        {
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
