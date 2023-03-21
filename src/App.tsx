import { useEffect, useState } from 'react';
import './App.css';

import Board from './components/ui/Board';
import { Piece } from './models/piece';
import SquareModel from './models/square';
import RadioButton from './components/ui/RadioButton';
import Button from './components/ui/Button';

import {
  calcStatusText,
  calculateGameOver,
  calculateWinner,
  findBestMove,
  playerPiece,
} from './utils';

function App() {
  const initializeSquares = () => {
    return Array<SquareModel>(9)
      .fill({ mark: null })
      .map((square) => ({ ...square }));
  };

  const [squares, setGameSquares] = useState(initializeSquares());
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [players, setPlayers] = useState<[Piece, Piece]>(['X', 'O']);
  const [singlePlayerMode, setSinglePlayerMode] = useState<boolean>(false);

  const calculatePlayFromMove = playerPiece(players);

  const currentPlayer = calculatePlayFromMove(currentMove);

  const winner = calculateWinner(squares);
  const isOver = calculateGameOver(squares);
  const status = calcStatusText(winner, isOver, currentPlayer);

  useEffect(() => {
    if (!winner && !isOver && singlePlayerMode && currentPlayer == 'O') {
      const bestMove = findBestMove(squares, players, currentMove);
      handleSquareClick(bestMove);
    }
  }, [currentMove]);

  /*
   * Marks a square as 'X' or 'O' depending on the current player.
   * Squares are not updated if it has already been marked, there
   * is a winner, or the game ends in a draw.
   */
  const handleSquareClick = (id: number) => {
    if (winner || isOver || squares[id].mark) {
      return;
    }

    setCurrentMove(currentMove + 1);

    const updatedSquares: SquareModel[] = squares.map((square, index) => {
      if (id === index) {
        return { mark: currentPlayer };
      }
      return square;
    });

    setGameSquares(updatedSquares);
  };

  /*
   * Logic to set the game to one or two player mode.
   */
  const handleSinglePlayerClick = () => {
    setSinglePlayerMode(!singlePlayerMode);
  };

  /*
   * Logic to reset the game and associated state.
   */
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
          <div>
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
          </div>
          <Button value="Reset" onClickHandler={handleResetClick} />
        </div>
      </div>
    </>
  );
}

export default App;
