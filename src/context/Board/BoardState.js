import React from 'react';
import useBoard, { DiscFactory } from '~/Hook/UseBoard';
import BoardContext from '~/context/Board/BoardContext';
import { PEON, KING } from '~/constants/rolesDisc';
import { SET_SELECTED_DISC, SET_AVALIABLE_PLACES, SET_PLAYER_TURN, SET_BOARD_MOV } from '~/context/Board/actionsTypes';


const BoardState = (props) => {
  // BOARD GENERATOR FUNCTION
  const { children } = props;

  const initialState = {
    availablePlaces: [
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
      payload: initialState.availablePlaces,
    });
    // selectedDisc
    dispatch({
      type: SET_SELECTED_DISC,
      payload: { x: null, y: null, rol: null },
    });
  };

  const checkDiscColorInCell = (x, y, xDir, yDir, memo, color) => {
    const aprovDown = (x) <= state.sizeMatrizX;
    const aprovTop = (x) >= 0;
    const aprovLeft = (y) >= 0;
    const aprovRight = (y) <= state.sizeMatrizY;
    const down = (x);
    const top = (x);
    const left = (y);
    const right = (y);

    if (xDir === 'down' && aprovDown) {
      if (yDir === 'left' && aprovLeft) {
        return memo[down][left].color === color;
      }
      if (yDir === 'right' && aprovRight) {
        return memo[down][right].color === color;
      }
    } else if (xDir === 'top' && aprovTop) {
      if (yDir === 'left' && aprovLeft) {
        return memo[top][left].color === color;
      } if (yDir === 'right' && aprovRight) {
        return memo[top][right].color === color;
      }
    }
    return false;
  };

  const checkFreeCell = (x, y, xDir, yDir) => {
    const { memo } = state;
    const aprovDown = (x) <= state.sizeMatrizX;
    const aprovTop = (x) >= 0;
    const aprovLeft = (y) >= 0;
    const aprovRight = (y) <= state.sizeMatrizY;
    const down = (x);
    const top = (x);
    const left = (y);
    const right = (y);

    if (xDir === 'down' && aprovDown) {
      if (yDir === 'left' && aprovLeft) {
        return memo[down][left] === 0;
      }
      if (yDir === 'right' && aprovRight) {
        return memo[down][right] === 0;
      }
    } else if (xDir === 'top' && aprovTop) {
      if (yDir === 'left' && aprovLeft) {
        return memo[top][left] === 0;
      } if (yDir === 'right' && aprovRight) {
        return memo[top][right] === 0;
      }
    }
    return false;
  };
    // eslint-disable-next-line no-unused-vars
  const checkKeepMov = (x, y) => {

  };
  const checkArriveEndCellOfBoard = (x, y, color) => {
    switch (color) {
      case 'white':
        return ((x - state.sizeMatrizX) === 0);
      case 'black':
        return x === 0;
      default:
        return false;
    }
  };
  const peonEat = (movX, movY) => {
    const { timePlayer, memo, selectedDisc } = state;
    const virtualMemo = memo;
    const sideOfMovment = selectedDisc.y - movY > 0 ? 'left' : 'right';

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

    [sideOfMovment].forEach((side) => {
      const xAdd = sidesAdd[playerDirecction[timePlayer]];
      const yAdd = sidesAdd[side];
      // check if next cell its free
      if (checkFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, playerDirecction[timePlayer], side, memo)) {
        // else check if is opponent in next cell
      } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, playerDirecction[timePlayer], side, memo, opponent)) {
        // check if the next cell to the opponent its free
        virtualMemo[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 0;
        dispatch({
          type: `SET_${timePlayer.toUpperCase()}_POINTS`,
        });
      }
    });

    return virtualMemo;
  };
    // eslint-disable-next-line no-unused-vars
  const kingEat = (movX, movY) => {
    const { sizeMatrizX, selectedDisc, memo, timePlayer } = state;
    const virtualMemo = memo;
    let arraySelVside;
    let arraySelHside;
    if (selectedDisc.x - movX > 0) { arraySelVside = 'top'; } else {
      arraySelVside = 'down';
    }
    if (selectedDisc.y - movY > 0) { arraySelHside = 'left'; } else {
      arraySelHside = 'right';
    }


    const opponentColor = timePlayer === 'white' ? 'black' : 'white';
    /*eslint-disable */
        const sidesAdd = {
            'left': -1,
            'right': 1,
            'down': 1,
            'top': -1,
        };
        /* eslint-enable */
    const cantMov = sizeMatrizX;
    /* eslint-disable */
        let skipObj = {
            'downleft': true,
            'downright': true,
            'topleft': true,
            'topright': true,
        };
        let cantDiscInRoad = {
            'downleft': 0,
            'downright': 0,
            'topleft': 0,
            'topright': 0,
        }

        /* eslint-enable */

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= cantMov; i++) {
      // let cantDiscInRoad = 0;
      [arraySelVside].forEach((vSide) => {
        [arraySelHside].forEach((side) => {
          const xAdd = sidesAdd[vSide] * i;
          const yAdd = sidesAdd[side] * i;
          /* eslint-disable */
            let limitMovCond = {
                'top' : selectedDisc.x + xAdd >= movX,
                'down' : selectedDisc.x + xAdd <= movX
            };/* eslint-enable */
          const approve = skipObj[vSide + side];

          if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, opponentColor) && approve && limitMovCond[arraySelVside]) {
            if (cantDiscInRoad[vSide + side] < 1) {
              virtualMemo[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 0;
              dispatch({
                type: `SET_${timePlayer.toUpperCase()}_POINTS`,
              });
              skipObj[vSide + side] = false;
              cantDiscInRoad[vSide + side] += 1;
            }
          } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, timePlayer) && approve) {
            skipObj[vSide + side] = false;
            cantDiscInRoad[vSide + side] += 1;
          }
        });
      });
    }

    return virtualMemo;
  };

  const movDisc = (movX, movY) => {
    const { memo, selectedDisc, timePlayer } = state;
    const playerColor = timePlayer;
    const rol = selectedDisc.rol;
    let Disc = DiscFactory(playerColor, rol);
    const virtualMemo = Math.abs(movX - selectedDisc.x) >= 2 && rol === 'peon'
      ? peonEat(movX, movY)
      : rol === 'king' ? kingEat(movX, movY)
        : memo;
    virtualMemo[selectedDisc.x][selectedDisc.y] = 0;
    // eslint-disable-next-line no-multi-assign
    if (rol === 'peon' && checkArriveEndCellOfBoard(movX, movY, playerColor)) {
      Disc = DiscFactory(playerColor, 'king');
    }
    virtualMemo[movX][movY] = Disc; // MOV DISC TO THE NEW POSITION
    endTurn();

    // ADHIERER EL MOVIMIENTO A LA MATRIZ
    dispatch({
      type: SET_BOARD_MOV,
      payload: virtualMemo,
    });
  };

  // MOVIMINETO DE PEON
  const peonAvPlaces = () => {
    const { availablePlaces, selectedDisc, memo, timePlayer } = state;
    const VirtualAvPlaces = availablePlaces;

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
      // check if next cell its free
      if (checkFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, playerDirecction[timePlayer], side, memo)) {
        VirtualAvPlaces[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 'g';
        // else check if is opponent in next cell
      } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, playerDirecction[timePlayer], side, memo, opponent)) {
        // check if the next cell to the opponent its free
        if (checkFreeCell(selectedDisc.x + (xAdd * 2), selectedDisc.y + (yAdd * 2), playerDirecction[timePlayer], side, memo)) {
          VirtualAvPlaces[selectedDisc.x + (xAdd * 2)][selectedDisc.y + (yAdd * 2)] = 'g';
        }
      }
    });

    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };
  // MOVIMIENTO REY
  const kingAvPlaces = () => {
    const { availablePlaces, sizeMatrizX, selectedDisc, memo, timePlayer } = state;
    const VirtualAvPlaces = availablePlaces;
    const opponentColor = timePlayer === 'white' ? 'black' : 'white';
    /*eslint-disable */
    const sidesAdd = {
      'left': -1,
      'right': 1,
      'down': 1,
      'top': -1,
    };

    const cantMov = sizeMatrizX;

      let skipObj = {
          'downleft': true,
          'downright': true,
          'topleft': true,
          'topright': true,
      };
      let cantDiscInRoad = {
          'downleft': 0,
          'downright': 0,
          'topleft': 0,
          'topright': 0,
      }
      /* eslint-enable */

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= cantMov; i++) {
      ['down', 'top'].forEach((vSide) => {
        ['left', 'right'].forEach((side) => {
          const xAdd = sidesAdd[vSide] * i;
          const yAdd = sidesAdd[side] * i;
          const approve = skipObj[vSide + side];

          // check empty next cell
          if (checkFreeCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo) && approve) {
            // eslint-disable-next-line no-unused-expressions
            cantDiscInRoad[(vSide + side)] <= 1 ? VirtualAvPlaces[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 'g' : '';
            // else check if is opponent in next cell
          } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, opponentColor) && approve) {
            // eslint-disable-next-line no-plusplus,no-unused-expressions
            cantDiscInRoad[(vSide + side)] += 1;
          } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, timePlayer) && approve) {
            skipObj[vSide + side] = false;
            cantDiscInRoad[(vSide + side)] += 1;
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
        payload: initialState.availablePlaces,
      });
      // Sube al estado el disco seleccionado
      dispatch({
        type: SET_SELECTED_DISC,
        payload: { x, y, rol },
      });
    }
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
          availablePlaces: state.availablePlaces,
          pointsWhitePlayer: state.pointsWhitePlayer,
          pointsBlackPlayer: state.pointsBlackPlayer,
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
