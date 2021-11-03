import React from 'react';
import useBoard, { DiscFactory } from '~/Hook/UseBoard';
import BoardContext from '~/context/Board/BoardContext';
import { PEON, KING } from '~/constants/rolesDisc';


const BoardState = (props) => {
  // BOARD GENERATOR FUNCTION
  const { children } = props;

  const initialState = {
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
    if (state.timePlayer === 'white') {
      playerToPlay = 'black';
    } else {
      playerToPlay = 'white';
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

  const peonEat = (memo) => {
    const virtualMemo = memo;
    // BLANCO
    // ! VER QUE COME LA FICHA DE LA DERECHA Y DE LA IZQUIERDA TODO
    if (state.timePlayer === 'white') {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1].color === 'black' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y - 2] === 0) {
          // TODO chequear si come ficha
          virtualMemo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] = 0;
        }
      }
      // DERECHA
      if (state.selectedDisc.y + 1 <= state.sizeBoardY && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1].color === 'black' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y + 2] === 0) {
          virtualMemo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] = 0;
        }
      }
    } /* NEGRO */ else {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) {
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1].color === 'white' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y - 2] === 0) {
          virtualMemo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] = 0;
        }
      }
      // DERECHA
      if (state.selectedDisc.y + 1 <= state.sizeBoardY && state.selectedDisc.x - 1 >= 0 && state.selectedDisc.y !== null) {
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1].color === 'white' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y + 2] === 0) {
          virtualMemo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] = 0;
        }
      }
    }
    return virtualMemo;
  };

  const movDisc = (movX, movY, memo, selectedDisc, playerColor, rol) => {
    const Disc = DiscFactory(playerColor, rol);
    // ! Controller for KING
    const virtualMemo = Math.abs(movX - selectedDisc.x) >= 2 ? peonEat(memo) : memo; // Si el peon mueve mas de un casillero es porque come a otra ficha
    virtualMemo[selectedDisc.x][selectedDisc.y] = 0;
    virtualMemo[movX][movY] = Disc;
    endTurn();
    // ADHIERER EL MOVIMIENTO A LA MATRIZ
    dispatch({
      type: 'SET_BOARD_MOV',
      payload: virtualMemo,
    });
  };

  // MOVIMINETO DE PEON
  const peonAvPlaces = () => {
    const VirtualAvPlaces = state.avaliablePlaces;
    // BLANCO
    const aprov = Math.abs(state.selectedDisc.x - state.sizeBoardX);
    if (state.timePlayer === 'white' && aprov > 1) {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x + 1 <= state.sizeBoardY && state.selectedDisc.y !== null) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] === 0) {
          const left = {
            x: state.selectedDisc.x + 1,
            y: state.selectedDisc.y - 1,
          };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (state.memo[state.selectedDisc.x + 2][state.selectedDisc.y - 2] !== undefined) {
          if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1].color === 'black' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y - 2] === 0) {
            // TODO chequear si come ficha
            VirtualAvPlaces[state.selectedDisc.x + 2][state.selectedDisc.y - 2] = 'g';
          }
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
        } else if (state.memo[state.selectedDisc.x + 2][state.selectedDisc.y + 2] !== undefined) {
          if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1].color === 'black' && state.memo[state.selectedDisc.x + 2][state.selectedDisc.y + 2] === 0) {
            VirtualAvPlaces[state.selectedDisc.x + 2][state.selectedDisc.y + 2] = 'g';
          }
        }
      }
    } /* NEGRO */ else if (state.timePlayer === 'black' && state.selectedDisc.y !== null && aprov > 0) {
      // IZQ
      if (state.selectedDisc.y - 1 >= 0 && state.selectedDisc.x - 1 >= 0) {
        // SI HAY LUGAR LIBRE
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] === 0) {
          const left = { x: state.selectedDisc.x - 1, y: state.selectedDisc.y - 1 };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1].color === 'white' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y - 2] === 0) {
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
        } else if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1].color === 'white' && state.memo[state.selectedDisc.x - 2][state.selectedDisc.y + 2] === 0) {
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
  const checkMovement = (rol) => {
    switch (rol) {
      case PEON:
        console.log(`state.selectedDisc.x:${state.selectedDisc.x} <= state.sizeBoardX:${state.sizeBoardX}`);
        peonAvPlaces();
        break;
      case KING:
        break;
      default:
        throw new Error('ERROR DE ROL DE FICHA');
    }
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
    console.log(`TURNO DEL JUGADOR ${state.timePlayer === 'white' ? 'BLANCO' : 'NEGRO'}`);
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
