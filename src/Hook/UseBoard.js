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

const initialState = {
  // Memooria de las piezas del juego
  memo: [
    [0, wDisc, 0, wDisc, 0, wDisc, 0, wDisc, 0, wDisc],
    [wDisc, 0, wDisc, 0, wDisc, 0, wDisc, 0, wDisc, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, bDisc, 0, bDisc, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, wDisc, 0, 0, 0, 0, 0, bDisc],
    [0, 0, 0, 0, bDisc, 0, bDisc, 0, bDisc, 0],
  ],
  keepMov: false,
  sizeBoardX: 8, // Cantidad de columnas a lo alto del tablero
  sizeBoardY: 10, // Cantidad de columnas a lo ancho del tablero
  sizeMatrizX: 7,
  sizeMatrizY: 9,
  cellSize: 70, // tamaño en px de cada celda
  timePlayer: 'white', // Blanco o Negro, es el jugador en turno
  selectedDisc: { x: null, y: null, rol: null }, // Disco que haas sido seleccionado
  avaliablePlaces: [ // mastriz en la quie se almacenan los lugares disponibles en base al selectedDisc, se mara con 'g' el lugar habilitado
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

const useBoard = () => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);
  return [state, dispatch];
};

export default useBoard;
