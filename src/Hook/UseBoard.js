import { useReducer } from 'react';
import BoardReducer from '~/context/Board/BoardReducer';

const initialState = {
  // Memooria de las piezas del juego
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
  sizeBoardX: 8, // Cantidad de columnas a lo alto del tablero
  sizeBoardY: 10, // Cantidad de columnas a lo ancho del tablero
  cellSize: 70, // tamaño en px de cada celda
  timePlayer: 'w', // Blanco o Negro, es el jugador en turno
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
