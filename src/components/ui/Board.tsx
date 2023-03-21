import React from 'react';
import './Board.css';
import Square from './Square';
import SquareModel from '../models/square';

type Props = {
  status: string;
  squares: SquareModel[];
  onClickHandler: (id: number) => void;
};

const Board: React.FC<Props> = ({ status, squares, onClickHandler }) => {
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0].mark}
          onSquareClick={() => onClickHandler(0)}
        />
        <Square
          value={squares[1].mark}
          onSquareClick={() => onClickHandler(1)}
        />
        <Square
          value={squares[2].mark}
          onSquareClick={() => onClickHandler(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3].mark}
          onSquareClick={() => onClickHandler(3)}
        />
        <Square
          value={squares[4].mark}
          onSquareClick={() => onClickHandler(4)}
        />
        <Square
          value={squares[5].mark}
          onSquareClick={() => onClickHandler(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6].mark}
          onSquareClick={() => onClickHandler(6)}
        />
        <Square
          value={squares[7].mark}
          onSquareClick={() => onClickHandler(7)}
        />
        <Square
          value={squares[8].mark}
          onSquareClick={() => onClickHandler(8)}
        />
      </div>
    </>
  );
};

export default Board;
