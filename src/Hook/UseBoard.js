import { useReducer } from 'react';
import BoardReducer from '~/context/Board/BoardReducer';

export const DiscFactory = (color, rol) => {
  const Disc = {
    color,
    rol,
  };
  return Disc;
};
const wDisc = DiscFactory('white', 'peon');
const bDisc = DiscFactory('black', 'peon');
// const kDisc = DiscFactory('white', 'king');
const setXboard = 8;
const setYboard = 10;
const rowOfDisc = 3 || Math.ceil((setXboard - 3) / 2);
const avPlacesGenerator = () => {
  const avPlaces = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < setXboard; i++) {
    const row = [];
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < setYboard; j++) {
      row.push(0);
    }
    avPlaces.push(row);
  }
  return avPlaces;
};
const boardGenerator = () => {
  const board = [];
  const elementSelector = (index) => {
    if (rowOfDisc - index > 0) {
      return wDisc;
    }
    if (index >= (setXboard - rowOfDisc)) {
      return bDisc;
    }
    return 0;
  };
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < setXboard; i++) {
    const row = [];
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < setYboard; j++) {
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          row.push(0);
        } else {
          row.push(elementSelector(i));
        }
      } else if (j % 2 === 0) {
        row.push(elementSelector(i));
      } else {
        row.push(0);
      }
    }
    board.push(row);
  }
  return board;
};
const boardGenerated = boardGenerator();
const avPlaces = avPlacesGenerator();
const initialState = {
  memo: boardGenerated, // Memooria de las piezas del juego
  keepMov: false, // si puede seguir comento enemigos es true
  sizeBoardX: setXboard, // Cantidad de columnas a lo alto del tablero
  sizeBoardY: setYboard, // Cantidad de columnas a lo ancho del tablero
  sizeMatrizX: setXboard - 1,
  sizeMatrizY: setYboard - 1,
  cellSize: 70, // tamaño en px de cada celda
  pointsWhitePlayer: 0,
  pointsBlackPlayer: 0,
  cantDiscPerPlayer: Math.floor(setYboard / 2) * rowOfDisc,
  timePlayer: 'white', // Blanco o Negro, es el jugador en turno
  selectedDisc: { x: null, y: null, rol: null }, // Disco que haas sido seleccionado
  availablePlaces: avPlaces,
};
const useBoard = () => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);
  return [state, dispatch];
};

export default useBoard;
