import React from 'react';
import useBoard, { DiscFactory } from '~/Hook/UseBoard';
import BoardContext from '~/context/Board/BoardContext';
import { PEON, KING } from '~/constants/rolesDisc';
import { SET_SELECTED_DISC, SET_AVALIABLE_PLACES, SET_PLAYER_TURN, SET_BOARD_MOV } from '~/context/Board/actionsTypes';


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
      type: SET_PLAYER_TURN,
      payload: playerToPlay,
    });
    // avaliablePlaces
    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: initialState.avaliablePlaces,
    });
    // selectedDisc
    dispatch({
      type: SET_SELECTED_DISC,
      payload: { x: null, y: null, rol: null },
    });
  };

  const checkKeepMov = (x, y) => {
    // const VirtualAvPlaces = initialState.avaliablePlaces;
    const { timePlayer, memo, sizeMatrizY, sizeMatrizX } = state;

    console.log('x=> ', x);
    console.log('y=>', y);
    // BLANCO
    if (timePlayer === 'white') {
      // IZQ
      if ((x + 2) <= (sizeMatrizX) && (y - 2) >= 0) {
        if (memo[x + 1][y - 1].color === 'black' && memo[x + 2][y - 2] === 0) {
          if ((x + 2) <= (sizeMatrizX) && (y - 2) >= 0) {
            checkKeepMov(x + 2, y - 2);
          }
          console.log({ x: x + 2, y: y - 2 });
          return true;
        }
      }

      // DERECHA
      if ((x + 2) <= (sizeMatrizX) && (y + 2) <= sizeMatrizY) { // si no se pasa del tablero
        if (memo[x + 2][y + 2] !== undefined) {
          if (memo[x + 1][y + 1].color === 'black' && memo[x + 2][y + 2] === 0) {
            if ((x + 2) <= (sizeMatrizX) && (y + 2) <= sizeMatrizY) {
              checkKeepMov(x + 2, y + 2);
            }
            console.log({ x: x + 2, y: y + 2 });
            return true;
          }
        }
      }
    }

    if (timePlayer === 'black') {
      // IZQ
      if ((x - 2) >= 0 && (y - 2) >= 0) {
        if (memo[x - 1][y - 1].color === 'white' && memo[x - 2][y - 2] === 0) {
          if ((x - 2) >= 0 && (y - 2) >= 0) {
            checkKeepMov(x - 2, y - 2);
          }
          console.log({ x: x - 2, y: y - 2 });
          return true;
        }
      }

      // DERECHA
      if ((x - 2) >= 0 && (y + 2) <= sizeMatrizY) {
        if (memo[x - 1][y + 1].color === 'white' && memo[x - 2][y + 2] === 0) {
          if ((x - 2) >= (0) && (y + 2) <= sizeMatrizY) {
            checkKeepMov(x - 2, y + 2);
          }
          console.log({ x: x - 2, y: y + 2 });
          return true;
        }
      }
    }
    return false;
  };
  const checkArriveEndCellOfBoard = (x, y, color) => {
    if (color === 'white') {
      console.log(x - state.sizeMatrizX);
      console.log(y - state.sizeMatrizY);
      return ((x - state.sizeMatrizX) === 0);
    }
    if (color === 'black') {
      return x === 0;
    }
    return false;
  };
  const peonEat = (memo, movX, movY, selectedDisc) => {
    const virtualMemo = memo;
    // Determinar si se mueve hacia izq o derecha
    let sideToMov;
    if (movY < selectedDisc.y) {
      // Mueve Izq
      sideToMov = 'left';
    } else {
      // Mueve Derecha
      sideToMov = 'right';
    }

    // BLANCO
    if (state.timePlayer === 'white') {
      // IZQ
      if (sideToMov === 'left') { // si no se pasa del tablero
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y - 1].color === 'black') {
          // TODO chequear si come ficha
          virtualMemo[state.selectedDisc.x + 1][state.selectedDisc.y - 1] = 0;
        }
      }
      // DERECHA
      if (sideToMov === 'right') {
        if (state.memo[state.selectedDisc.x + 1][state.selectedDisc.y + 1].color === 'black') {
          virtualMemo[state.selectedDisc.x + 1][state.selectedDisc.y + 1] = 0;
        }
      }
    } /* NEGRO */ else {
      // IZQ
      if (sideToMov === 'left') {
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y - 1].color === 'white') {
          virtualMemo[state.selectedDisc.x - 1][state.selectedDisc.y - 1] = 0;
        }
      }
      // DERECHA
      if (sideToMov === 'right') {
        if (state.memo[state.selectedDisc.x - 1][state.selectedDisc.y + 1].color === 'white') {
          virtualMemo[state.selectedDisc.x - 1][state.selectedDisc.y + 1] = 0;
        }
      }
    }
    return virtualMemo;
  };
  const movDisc = (movX, movY, memo, selectedDisc, playerColor, rol) => {
    let Disc = DiscFactory(playerColor, rol);

    const virtualMemo = Math.abs(movX - selectedDisc.x) >= 2 && rol === 'peon' ? peonEat(memo, movX, movY, selectedDisc) : memo; // Si el peon mueve mas de un casillero es porque come a otra ficha
    virtualMemo[selectedDisc.x][selectedDisc.y] = 0;
    if (rol === 'peon' && checkArriveEndCellOfBoard(movX, movY, playerColor)) {
      Disc = DiscFactory(playerColor, 'king');
    }
    virtualMemo[movX][movY] = Disc;
    console.log(checkKeepMov(movX, movY));
    endTurn();
    // ADHIERER EL MOVIMIENTO A LA MATRIZ
    dispatch({
      type: SET_BOARD_MOV,
      payload: virtualMemo,
    });
  };

  // MOVIMINETO DE PEON
  const peonAvPlaces = () => {
    const { avaliablePlaces, sizeMatrizY, sizeMatrizX, selectedDisc, memo, timePlayer } = state;
    const VirtualAvPlaces = avaliablePlaces;

    // BLANCO
    if (timePlayer === 'white') {
      // IZQ
      if ((selectedDisc.y - 1) >= 0 && (selectedDisc.x + 1) <= sizeMatrizX) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (memo[selectedDisc.x + 1][selectedDisc.y - 1] === 0) {
          const left = {
            x: selectedDisc.x + 1,
            y: selectedDisc.y - 1,
          };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (selectedDisc.x + 2 <= sizeMatrizX && selectedDisc.y - 2 > 0) {
          if (memo[selectedDisc.x + 1][selectedDisc.y - 1].color === 'black' && memo[selectedDisc.x + 2][selectedDisc.y - 2] === 0) {
            // TODO chequear si come ficha
            VirtualAvPlaces[selectedDisc.x + 2][selectedDisc.y - 2] = 'g';
          }
        }
      }
      // DERECHA
      if (selectedDisc.y + 1 <= sizeMatrizY && selectedDisc.x + 1 <= sizeMatrizX) { // si no se pasa del tablero
        if (memo[selectedDisc.x + 1][selectedDisc.y + 1] === 0) {
          const right = {
            x: selectedDisc.x + 1,
            y: selectedDisc.y + 1,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (selectedDisc.x + 2 <= sizeMatrizX && selectedDisc.y + 2 <= sizeMatrizY) {
          if (memo[selectedDisc.x + 1][selectedDisc.y + 1].color === 'black' && memo[selectedDisc.x + 2][selectedDisc.y + 2] === 0) {
            VirtualAvPlaces[selectedDisc.x + 2][selectedDisc.y + 2] = 'g';
          }
        }
      }
    } /* NEGRO */ else if (timePlayer === 'black') {
      // IZQ
      if (selectedDisc.y - 1 >= 0 && selectedDisc.x - 1 >= 0) {
        // SI HAY LUGAR LIBRE
        if (memo[selectedDisc.x - 1][selectedDisc.y - 1] === 0) {
          const left = { x: selectedDisc.x - 1, y: selectedDisc.y - 1 };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (selectedDisc.x - 2 >= 0 && selectedDisc.y - 2 >= 0) {
          if (memo[selectedDisc.x - 1][selectedDisc.y - 1].color === 'white' && memo[selectedDisc.x - 2][selectedDisc.y - 2] === 0) {
            VirtualAvPlaces[selectedDisc.x - 2][selectedDisc.y - 2] = 'g';
          }
        }
      }
      // DERECHA
      if (selectedDisc.y + 1 <= sizeMatrizY && selectedDisc.x - 1 >= 0 && selectedDisc.y !== null) {
        if (memo[selectedDisc.x - 1][selectedDisc.y + 1] === 0) {
          const right = {
            x: selectedDisc.x - 1,
            y: selectedDisc.y + 1,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (selectedDisc.x - 2 >= 0 && selectedDisc.y + 2 <= sizeMatrizY) {
          if (memo[selectedDisc.x - 1][selectedDisc.y + 1].color === 'white' && memo[selectedDisc.x - 2][selectedDisc.y + 2] === 0) {
            VirtualAvPlaces[selectedDisc.x - 2][selectedDisc.y + 2] = 'g';
          }
        }
      }
    }
    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };
  const kingAvPlaces = () => {
    const { avaliablePlaces, sizeMatrizY, sizeMatrizX, selectedDisc, memo } = state;
    const VirtualAvPlaces = avaliablePlaces;

    // BLANCO

    const cantMov = sizeMatrizX;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= cantMov; i++) {
      // abajo IZQ
      if ((selectedDisc.y - i) >= 0 && (selectedDisc.x + i) <= sizeMatrizX) { // si no se pasa del tablero
        if (memo[selectedDisc.x + i][selectedDisc.y - i] === 0) {
          const left = {
            x: selectedDisc.x + i,
            y: selectedDisc.y - i,
          };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (selectedDisc.x + (i + 1) <= sizeMatrizX && selectedDisc.y - (i + 1) > 0) {
          if (memo[selectedDisc.x + i][selectedDisc.y - i].color === 'black' && memo[selectedDisc.x + (i + 1)][selectedDisc.y - (i + 1)] === 0) {
            VirtualAvPlaces[selectedDisc.x + (i + 1)][selectedDisc.y - (i + 1)] = 'g';
          }
        }
      }
      // arriba IZQ
      if ((selectedDisc.y - i) >= 0 && (selectedDisc.x - i) >= 0) { // si no se pasa del tablero
        // SI HAY LUGAR LIBRE
        if (memo[selectedDisc.x - i][selectedDisc.y - i] === 0) {
          const left = {
            x: selectedDisc.x - i,
            y: selectedDisc.y - i,
          };
          VirtualAvPlaces[left.x][left.y] = 'g';
        } else if (selectedDisc.x - (i + 1) >= 0 && selectedDisc.y - (i + 1) >= 0) {
          if (memo[selectedDisc.x - i][selectedDisc.y - i].color === 'black' && memo[selectedDisc.x - (i + 1)][selectedDisc.y - (i + 1)] === 0) {
            VirtualAvPlaces[selectedDisc.x - (i + 1)][selectedDisc.y - (i + 1)] = 'g';
          }
        }
      }

      // abajo DERECHA
      if (selectedDisc.y + i <= sizeMatrizY && selectedDisc.x + i <= sizeMatrizX) {
        if (memo[selectedDisc.x + i][selectedDisc.y + i] === 0) {
          const right = {
            x: selectedDisc.x + i,
            y: selectedDisc.y + i,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (selectedDisc.x + (i + 1) <= sizeMatrizX && selectedDisc.y + (i + 1) <= sizeMatrizY) {
          if (memo[selectedDisc.x + i][selectedDisc.y + i].color === 'black' && memo[selectedDisc.x + (i + 1)][selectedDisc.y + (i + 1)] === 0) {
            VirtualAvPlaces[selectedDisc.x + (i + 1)][selectedDisc.y + (i + 1)] = 'g';
          }
          // !Ver recorrido de rey cuando hay mas de una ficha y de distintos colores
          if (memo[selectedDisc.x + i][selectedDisc.y + i].color === 'white') {
            //
          }
        }
      }
      // arriba DERECHA
      if ((selectedDisc.y + i) <= sizeMatrizY && (selectedDisc.x - i) >= 0) {
        if (memo[selectedDisc.x - i][selectedDisc.y + i] === 0) {
          const right = {
            x: selectedDisc.x - i,
            y: selectedDisc.y + i,
          };
          VirtualAvPlaces[right.x][right.y] = 'g';
        } else if (selectedDisc.x - (i + 1) >= 0 && selectedDisc.y + (i + 1) <= sizeMatrizY) {
          if (memo[selectedDisc.x - i][selectedDisc.y + i].color === 'black' && memo[selectedDisc.x - (i + 1)][selectedDisc.y + (i + 1)] === 0) {
            VirtualAvPlaces[selectedDisc.x - (i + 1)][selectedDisc.y + (i + 1)] = 'g';
          }
          if (memo[selectedDisc.x - i][selectedDisc.y + i].color === 'white') {
            //
          }
        }
      }
    }

    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };

  // PINTA LUGARES A MOVER
  const checkMovement = (rol) => {
    switch (rol) {
      case PEON:
        // console.log(`state.selectedDisc.x:${state.selectedDisc.x} <= state.sizeBoardX:${state.sizeBoardX}`);
        peonAvPlaces();
        break;
      case KING:
        kingAvPlaces();
        break;
      default:
        throw new Error('ERROR DE ROL DE FICHA');
    }
  };

  // CHEQUEA QUE SE CLICKEE EN LA FICHA DEL JUDARO DE TURNO
  const checkPlayerTurn = (color, x, y, rol) => {
    if (color === state.timePlayer) {
      dispatch({
        type: SET_AVALIABLE_PLACES,
        payload: initialState.avaliablePlaces,
      });
      // Sube al estado el disco seleccionado
      dispatch({
        type: SET_SELECTED_DISC,
        payload: { x, y, rol },
      });
      return;
    }
    console.log(`TURNO DEL JUGADOR ${state.timePlayer === 'white' ? 'BLANCO' : 'NEGRO'}`);
  };


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
