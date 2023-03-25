import React from 'react';
import './Board.css';
import Square from './Square';

import BoardSquare from '../../models/square';

type Props = {
  status: string;
  squares: BoardSquare[];
  onClickHandler: (id: number) => void;
};

const Board: React.FC<Props> = ({ status, squares, onClickHandler }) => {
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0].player}
          onSquareClick={() => onClickHandler(0)}
        />
        <Square
          value={squares[1].player}
          onSquareClick={() => onClickHandler(1)}
        />
        <Square
          value={squares[2].player}
          onSquareClick={() => onClickHandler(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3].player}
          onSquareClick={() => onClickHandler(3)}
        />
        <Square
          value={squares[4].player}
          onSquareClick={() => onClickHandler(4)}
        />
        <Square
          value={squares[5].player}
          onSquareClick={() => onClickHandler(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6].player}
          onSquareClick={() => onClickHandler(6)}
        />
        <Square
          value={squares[7].player}
          onSquareClick={() => onClickHandler(7)}
        />
        <Square
          value={squares[8].player}
          onSquareClick={() => onClickHandler(8)}
        />
      </div>
    </>
  );
};

export default Board;
