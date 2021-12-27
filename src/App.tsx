import React from 'react';
import BoardState from "src/context/BoardState";
import Board from "src/components/Board";
import "src/scss/_app.scss"

function App() {
  return (
      <BoardState>
        <Board/>
      </BoardState>
  );
}

export default App;
