import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { Mark } from './models/square';
import SquareModel from './models/square';
import RadioButton from './components/RadioButton';
import Button from './components/Button';

const WIN_POSITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type SinglePlayerMode = boolean;

function App() {
  const initializeSquares = () => {
    return Array<SquareModel>(9).fill({ mark: null });
  };

  const [squares, setGameSquares] = useState(initializeSquares());
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [singlePlayerMode, setSinglePlayerMode] =
    useState<SinglePlayerMode>(false);

  const xIsNext = currentMove % 2 === 0;

  const mark = xIsNext ? 'X' : 'O';

  const calculateWinner = (squares: SquareModel[]): Mark => {
    for (const [a, b, c] of WIN_POSITIONS) {
      if (
        squares[a].mark === squares[b].mark &&
        squares[a].mark === squares[c].mark
      ) {
        return squares[a].mark;
      }
    }
    return null;
  };

  const calculateGameOver = (squares: SquareModel[]): boolean => {
    return squares.filter((square) => !square.mark).length === 0;
  };

  let status;
  const winner = calculateWinner(squares);
  const isOver = calculateGameOver(squares);

  if (winner) {
    status = `Winner is ${winner}`;
  } else if (isOver) {
    status = 'Game ended in a draw!';
  } else {
    status = `Current player: ${mark}`;
  }

  const handleSquareClick = (id: number) => {
    if (winner || isOver || squares[id].mark) {
      return;
    }

    setCurrentMove(currentMove + 1);

    const updatedSquares: SquareModel[] = squares.map((square, index) => {
      if (id === index) {
        return { mark };
      }
      return square;
    });

    setGameSquares(updatedSquares);
  };

  const handleSinglePlayerClick = () => {
    setSinglePlayerMode(!singlePlayerMode);
  };

  const handleResetClick = () => {
    setCurrentMove(0);
    setSinglePlayerMode(singlePlayerMode);
    setGameSquares(initializeSquares());
  };

  return (
    <>
      <div className="App">
        <Board
          status={status}
          squares={squares}
          onClickHandler={handleSquareClick}
        />
      </div>
      <div className="menu-options">
        <div>
          {/* <div>
            <RadioButton
              label="1 player"
              value={singlePlayerMode}
              onChange={handleSinglePlayerClick}
              disabled={currentMove > 0}
            />
            <RadioButton
              label="2 players"
              value={!singlePlayerMode}
              onChange={handleSinglePlayerClick}
              disabled={currentMove > 0}
            />
          </div> */}
          <Button value="Reset" onClickHandler={handleResetClick} />
        </div>
      </div>
    </>
  );
}

export default App;
