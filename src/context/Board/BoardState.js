import React from 'react';
import useBoard, { DiscFactory } from '~/Hook/UseBoard';
import BoardContext from '~/context/Board/BoardContext';
import { PEON, KING } from '~/constants/rolesDisc';
import {
  SET_SELECTED_DISC,
  SET_AVALIABLE_PLACES,
  SET_PLAYER_TURN,
  SET_BOARD_MOV,
  SET_KEEP_MOV,
} from '~/context/Board/actionsTypes';

const BoardState = (props) => {
  // BOARD GENERATOR FUNCTION
  const { children } = props;
  const [state, dispatch] = useBoard();
  const avPlacesGenerator = () => {
    const avPlaces = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < state.sizeBoardX; i++) {
      const row = [];
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < state.sizeBoardY; j++) {
        row.push(0);
      }
      avPlaces.push(row);
    }
    return avPlaces;
  };
  const initialState = {
    avPlacesReset: avPlacesGenerator(),
  };


  const endTurn = (keepMov) => {
    // avaliablePlaces
    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: initialState.avPlacesReset,
    });

    if (!keepMov) {
      // change player
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

      // reset selectedDisc
      dispatch({
        type: SET_SELECTED_DISC,
        payload: { x: null, y: null, rol: null },
      });
    }
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

    if (xDir === 'down' && aprovDown) {
      if (yDir === 'left' && aprovLeft) {
        return memo[x][y] === 0;
      }
      if (yDir === 'right' && aprovRight) {
        return memo[x][y] === 0;
      }
    } else if (xDir === 'top' && aprovTop) {
      if (yDir === 'left' && aprovLeft) {
        return memo[x][y] === 0;
      } if (yDir === 'right' && aprovRight) {
        return memo[x][y] === 0;
      }
    }
    return false;
  };
    // eslint-disable-next-line no-unused-vars

  const checkArriveEndCellOfBoard = (x, y, color) => {
    /* Chequea que el peon ha llegadoa al final del tablero */
    switch (color) {
      case 'white':
        return ((x - state.sizeMatrizX) === 0);
      case 'black':
        return x === 0;
      default:
        return false;
    }
  };


  const peonCanMovAgain = (x, y) => {
    const { timePlayer, memo } = state;

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
        const avMovSide = {
            'left': false,
            'right': false,
        };
        const cantEnemySide = {
            'left': 0,
            'right': 0,
        };
        /* eslint-enable */

    // eslint-disable-next-line consistent-return
    ['left', 'right'].forEach((side) => {
      const vSide = playerDirecction[timePlayer];
      const xAdd = sidesAdd[vSide];
      const yAdd = sidesAdd[side];


      // check if next cell its free
      if (checkFreeCell(x + xAdd, y + yAdd, vSide, side, memo)) {
        avMovSide[side] = false;
        // else check if is opponent in next cell
      } else if (checkDiscColorInCell(x + xAdd, y + yAdd, vSide, side, memo, opponent)) {
        // check if the next cell to the opponent its free
        cantEnemySide[side] += 1;
        if (checkFreeCell(x + (xAdd * 2), y + (yAdd * 2), vSide, side, memo)) {
          avMovSide[side] = true;
        }
      }
    });
    console.log('-> avMovSide', avMovSide);
    console.log('-> cantEnemySide', cantEnemySide);

    if (cantEnemySide.left > 0 && avMovSide.left > 0) {
      return true;
    } if (cantEnemySide.right > 0 && avMovSide.right > 0) {
      return true;
    }

    return false;
  };

  const kingCanMovAgain = (x, y) => {
    const { sizeMatrizX, memo, timePlayer, selectedDisc } = state;
    let arraySelVside;
    let arraySelHside;
    if (selectedDisc.x - x > 0) { arraySelVside = 'top'; } else {
      arraySelVside = 'down';
    }
    if (selectedDisc.y - y > 0) { arraySelHside = 'left'; } else {
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
      const avMovSide = {
          'downleft': false,
          'downright': false,
          'topleft': false,
          'topright': false,
      };
      
      /* eslint-enable */

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 2; i++) {
      [arraySelVside].forEach((vSide) => {
        [arraySelHside].forEach((side) => {
          const xAdd = sidesAdd[vSide] * i;
          const yAdd = sidesAdd[side] * i;
          const approve = skipObj[vSide + side];

          // check empty next cell
          if (checkFreeCell(x + xAdd, y + yAdd, vSide, side, memo) && approve) {
            // else check if is opponent in next cell
            if (i === 1) {
              skipObj[vSide + side] = false;
            }
          } else if (checkDiscColorInCell(x + xAdd, y + yAdd, vSide, side, memo, opponentColor) && approve) {
            // eslint-disable-next-line no-plusplus,no-unused-expressions
            cantDiscInRoad[(vSide + side)] += 1;
            if (checkFreeCell(x + (xAdd * 2), y + (yAdd * 2), vSide, side, memo) && approve) {
              if (vSide === 'top' && x < (x + (xAdd * 2))) {
                avMovSide[(vSide + side)] = true;
              } else if (vSide === 'down' && x > (x + (xAdd * 2))) {
                avMovSide[(vSide + side)] = true;
              }
            }
          } else if (checkDiscColorInCell(x + xAdd, y + yAdd, vSide, side, memo, timePlayer) && approve) {
            skipObj[vSide + side] = false;
          }
        });
      });
    }
    console.log('-> cantDiscInRoad', cantDiscInRoad);
    console.log('-> avMovSide', avMovSide);


    return avMovSide.downleft || avMovSide.downright || avMovSide.topleft || avMovSide.topright;
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

    // eslint-disable-next-line consistent-return
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

  // PINTA CELDAS DISPONIBLES AL MOVIMIENTO DEL PEON
  // eslint-disable-next-line consistent-return
  const peonAvPlaces = () => {
    const { availablePlaces, selectedDisc, memo, timePlayer, keepMov } = state;
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
      let placesToMov = {
          'left': [],
          'right': [],
      };
      let cantEnemySide = {
          'left': 0,
          'right': 0,
      }
        /* eslint-enable */
    const x = selectedDisc.x;
    const y = selectedDisc.y;


    // eslint-disable-next-line consistent-return
    ['left', 'right'].forEach((side) => {
      const vSide = playerDirecction[timePlayer];
      const xAdd = sidesAdd[playerDirecction[timePlayer]];
      const yAdd = sidesAdd[side];

      // check if next cell its free
      if (checkFreeCell(x + xAdd, y + yAdd, vSide, side, memo)) {
        if (keepMov) {
          placesToMov[side].push({ x: x + xAdd, y: y + yAdd });
        } else {
          VirtualAvPlaces[x + xAdd][y + yAdd] = 'g';
        }
        // else check if is opponent in next cell
      } else if (checkDiscColorInCell(x + xAdd, y + yAdd, vSide, side, memo, opponent)) {
        cantEnemySide[side] += 1;
        // check if the next cell to the opponent its free
        if (checkFreeCell(x + (xAdd * 2), y + (yAdd * 2), vSide, side, memo)) {
          if (keepMov) {
            placesToMov[side].push({ x: x + (xAdd * 2), y: y + (yAdd * 2) });
          } else {
            VirtualAvPlaces[x + (xAdd * 2)][y + (yAdd * 2)] = 'g';
          }
        }
      }
    });
    if (keepMov) {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const property in cantEnemySide) {
        console.log('-> cantEnemySide', cantEnemySide);
        console.log('-> placesToMov', placesToMov);
        if (cantEnemySide[property] > 0 && placesToMov[property].length >= 1) {
          placesToMov[property].forEach((avPlaces) => {
            VirtualAvPlaces[avPlaces.x][avPlaces.y] = 'g';
          });
        }
      }
    }
    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };

  // PINTA CELDAS DISPONIBLES AL MOVIMIENTO DEL REY
  const kingAvPlaces = () => {
    const { availablePlaces, sizeMatrizX, selectedDisc, memo, timePlayer, keepMov } = state;
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
      let cantEnemyInRoad = {
          'downleft': 0,
          'downright': 0,
          'topleft': 0,
          'topright': 0,
      }
      let placesToMov = {
          'downleft': [],
          'downright': [],
          'topleft': [],
          'topright': [],
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
            if (!keepMov) {
              // eslint-disable-next-line no-unused-expressions
              cantDiscInRoad[(vSide + side)] <= 1 ? VirtualAvPlaces[selectedDisc.x + xAdd][selectedDisc.y + yAdd] = 'g' : '';
            } else {
              placesToMov[(vSide + side)].push({ x: selectedDisc.x + xAdd, y: selectedDisc.y + yAdd });
            }
            // else check if is opponent in next cell
          } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, opponentColor) && approve) {
            if (i === 1 && !checkFreeCell(selectedDisc.x + (xAdd * 2), selectedDisc.y + (yAdd * 2), vSide, side, memo)) {
              skipObj[vSide + side] = false;
            } else {
            // eslint-disable-next-line no-plusplus,no-unused-expressions
              cantDiscInRoad[(vSide + side)] += 1;
              cantEnemyInRoad[(vSide + side)] += 1;
            }
          } else if (checkDiscColorInCell(selectedDisc.x + xAdd, selectedDisc.y + yAdd, vSide, side, memo, timePlayer) && approve) {
            skipObj[vSide + side] = false;
            cantDiscInRoad[(vSide + side)] += 1;
          }
        });
      });
    }
    // console.log(cantEnemyInRoad);
    if (keepMov) {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const property in cantEnemyInRoad) {
        if (cantEnemyInRoad[property] > 0 && placesToMov[property].length >= 1) {
          placesToMov[property].forEach((avPlaces) => {
            VirtualAvPlaces[avPlaces.x][avPlaces.y] = 'g';
          });
        }
      }
    }
    dispatch({
      type: SET_AVALIABLE_PLACES,
      payload: VirtualAvPlaces,
    });
  };

  const checkKeepMov = (x, y) => {
    const { selectedDisc } = state;
    switch (selectedDisc.rol) {
      case 'peon':
        return peonCanMovAgain(x, y);
      case 'king':
        return kingCanMovAgain(x, y);
      default:
        return null;
    }
  };

  const movDisc = (movX, movY) => {
    const { memo, selectedDisc, timePlayer } = state;
    const playerColor = timePlayer;
    let Disc = DiscFactory(playerColor, selectedDisc.rol);

    // Come a su oponente
    const virtualMemo = Math.abs(movX - selectedDisc.x) >= 2 && selectedDisc.rol === 'peon'
      ? peonEat(movX, movY)
      : selectedDisc.rol === 'king' ? kingEat(movX, movY)
        : memo;

    // Borra el disco de la posicion anterior
    virtualMemo[selectedDisc.x][selectedDisc.y] = 0;
    if (selectedDisc.rol === 'peon' && checkArriveEndCellOfBoard(movX, movY, playerColor)) {
      Disc = DiscFactory(playerColor, 'king');
    }

    // Mueve el disco a su nueva posicion
    virtualMemo[movX][movY] = Disc;

    // Chequea si puede mover de nuevo
    let keepMov = false;
    if (selectedDisc.rol === 'peon' && Math.abs(movX - selectedDisc.x) >= 2) {
      keepMov = checkKeepMov(movX, movY);
      if (keepMov) {
        dispatch({
          type: SET_SELECTED_DISC,
          payload: { x: movX, y: movY, rol: selectedDisc.rol },
        });
        dispatch({
          type: SET_KEEP_MOV,
          payload: true,
        });
      } else {
        dispatch({
          type: SET_KEEP_MOV,
          payload: false,
        });
      }
    } else if (selectedDisc.rol === 'king') {
      keepMov = checkKeepMov(movX, movY);
      if (keepMov) {
        dispatch({
          type: SET_SELECTED_DISC,
          payload: { x: movX, y: movY, rol: selectedDisc.rol },
        });
        dispatch({
          type: SET_KEEP_MOV,
          payload: true,
        });
      } else {
        dispatch({
          type: SET_KEEP_MOV,
          payload: false,
        });
      }
    }

    endTurn(keepMov);

    // Adhiere el movimiento al estado
    dispatch({
      type: SET_BOARD_MOV,
      payload: virtualMemo,
    });
  };


  // CONTROLADOR DE LUGAR DISPONIBLES A MOVER EN BASE AL ROL
  const checkMovement = (rol) => {
    switch (rol) {
      case PEON:
        peonAvPlaces('availablePlaces');
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
      // Resetea los lugares de movimiento

      dispatch({
        type: SET_AVALIABLE_PLACES,
        payload: initialState.avPlacesReset,
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
          keepMov: state.keepMov,
          cantDiscPerPlayer: state.cantDiscPerPlayer,
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
