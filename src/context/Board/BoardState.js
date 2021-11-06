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
  const checkNextFreeCell = (x, y, xDir, yDir, memo, rol) => {
    /*eslint-disable */
      var aprovDown
      var aprovTop
      var aprovLeft
      var aprovRight
      var down
      var top
      var left
      var right

    if (rol === 'king') {
       aprovDown = (x) <= state.sizeMatrizX;
       aprovTop = (x) >= 0;
       aprovLeft = (y) >= 0;
       aprovRight = (y) <= state.sizeMatrizY;
       down = (x);
       top = (x);
       left = (y);
       right = (y);
    } else {
       aprovDown = (x + 1) <= state.sizeMatrizX;
       aprovTop = (x - 1) >= 0;
       aprovLeft = (y - 1) >= 0;
       aprovRight = (y + 1) <= state.sizeMatrizY;
       down = (x + 1);
       top = (x - 1);
       left = (y - 1);
       right = (y + 1);
    }
      /* eslint-enable */

    if (xDir === 'down' && aprovDown) {
      if (yDir === 'left' && aprovLeft) {
        if (memo[down][left] === 0) {
          return true;
        }
      }
      if (yDir === 'right' && aprovRight) {
        if (memo[down][right] === 0) {
          return true;
        }
      }
    } else if (xDir === 'top' && aprovTop) {
      if (yDir === 'left' && aprovLeft) {
        if (memo[top][left] === 0) {
          return true;
        } return false;
      } if (yDir === 'right' && aprovRight) {
        if (memo[top][right] === 0) {
          return true;
        }
        return false;
      }
    }
    return false;
  };
  const checkKeepMov = (x, y) => {
    // const VirtualAvPlaces = initialState.avaliablePlaces;
    const { timePlayer, memo, sizeMatrizY, sizeMatrizX } = state;

    // console.log('x=> ', x);
    // console.log('y=>', y);
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
    const { avaliablePlaces, selectedDisc, memo, timePlayer } = state;
    const VirtualAvPlaces = avaliablePlaces;

    // BLANCO
    const opponent = timePlayer === 'white' ? 'black' : 'white';
    /*eslint-disable */
      const playerDirecction = {
          'white': 'down',
          'black': 'top'
      };
      const sidesAdd = {
          'left': -1,
          'right': 1,
          'down': 1,
          'top':-1
      };
      /* eslint-enable */

    ['left', 'right'].forEach((side) => {
      const xAdd = sidesAdd[playerDirecction[timePlayer]];
      const yAdd = sidesAdd[side];
      if (checkNextFreeCell(selectedDisc.x, selectedDisc.y, playerDirecction[timePlayer], side, memo)) {
        VirtualAvPlaces[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 'g';
      } else if (checkNextFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, playerDirecction[timePlayer], side, memo)) {
        if (memo[selectedDisc.x + xAdd][selectedDisc.y + yAdd].color === opponent && memo[selectedDisc.x + (xAdd * 2)][selectedDisc.y + (yAdd * 2)] === 0) {
          VirtualAvPlaces[selectedDisc.x + (xAdd * 2)][selectedDisc.y + (yAdd * 2)] = 'g';
        }
      }
    });

    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };

  const kingAvPlaces = () => {
    const { avaliablePlaces, sizeMatrizX, selectedDisc, memo } = state;
    const VirtualAvPlaces = avaliablePlaces;
    /*eslint-disable */
    const sidesAdd = {
      'left': -1,
      'right': 1,
      'down': 1,
      'top': -1,
    };
      /* eslint-enable */
    const cantMov = sizeMatrizX;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= cantMov; i++) {
      ['down', 'top'].forEach((vSide) => {
        ['left', 'right'].forEach((side) => {
          const xAdd = sidesAdd[vSide] * i;
          const yAdd = sidesAdd[side] * i;
          // console.log({ vS: vSide, s: side, x: selectedDisc.x + xAdd, y: selectedDisc.y + yAdd, check: checkNextFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, selectedDisc.rol) });
          if (checkNextFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, selectedDisc.rol)) {
            VirtualAvPlaces[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 'g';
          }
        });
      });
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
