import React, { createContext, useState } from 'react';

export default ({ children }) => {
  const sizeBoardX = 8;
  const sizeBoardY = 10;
  const cellSize = 70;

  const initialState = [
    [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
    ['w', 0, 'w', 0, 'w', 0, 'w', 0, 'w', 0],
    [0, 'w', 0, 'w', 0, 'w', 0, 'w', 0, 'w'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['b', 0, 'b', 0, 'b', 0, 'b', 0, 'b', 0],
    [0, 'b', 0, 'b', 0, 'b', 0, 'b', 0, 'b'],
    ['b', 0, 'b', 0, 'b', 0, 'b', 0, 'b', 0],
  ];

  const [state, setState] = useState({
    board: {
      memo: initialState,
      sizeX: sizeBoardX,
      sizeY: sizeBoardY,
      cellSize,
    },

  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext();
