import { useEffect, useState } from 'react';
import './App.css';

import Board from './components/ui/Board';
import RadioButton from './components/ui/RadioButton';
import Button from './components/ui/Button';

import BoardSquare from './models/square';
import { Piece } from './models/piece';
import { BOARD_SIZE, AI_PLAYER } from './models/constants';
import { calculateGameOver, calculateWinner, calcStatusText } from './utils';
import { findBestMove, nextPlayer } from './utils/moves';

type GameMode = 'single' | 'multiple';

function App() {
  const [gameBoard, setGameBoard] = useState<BoardSquare[]>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('X');
  const [gameMode, setGameMode] = useState<GameMode>('multiple');
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);

  const winner = calculateWinner(gameBoard);
  const isOver = calculateGameOver(gameBoard);
  const status = calcStatusText(winner, isOver, currentPlayer);

  useEffect(() => {
    if (
      !calculateWinner(gameBoard) &&
      !isOver &&
      gameMode === 'single' &&
      currentPlayer === AI_PLAYER
    ) {
      const bestMove = findBestMove(gameBoard, currentPlayer);
      handleSquareClick(bestMove);
    }
  }, [currentPlayer]);

  function initializeBoard() {
    return Array<BoardSquare>(BOARD_SIZE)
      .fill({ player: null })
      .map((square) => ({ ...square }));
  }

  function changePlayer(player: Piece): void {
    const next = nextPlayer(player);
    setCurrentPlayer(next);
  }

  // Component attribute funtions listed below

  function handleSquareClick(squareId: number): void {
    if (gameBoard[squareId].player || winner || isOver) {
      return;
    }

    if (!gameInProgress) {
      setGameInProgress(true);
    }

    changePlayer(currentPlayer);

    const updatedBoard: BoardSquare[] = gameBoard.map((square, index) => {
      if (squareId === index) {
        return { player: currentPlayer };
      }
      return square;
    });

    setGameBoard(updatedBoard);
  }

  function handleGameModeClick() {
    const newMode = gameMode === 'multiple' ? 'single' : 'multiple';
    setGameMode(newMode);
  }

  /*
   * Logic to reset the game and associated state.
   */
  function handleResetClick() {
    setGameBoard(initializeBoard());
    setGameInProgress(false);
    setCurrentPlayer('X');
  }

  return (
    <>
      <div className="App">
        <Board
          status={status}
          squares={gameBoard}
          onClickHandler={handleSquareClick}
        />
      </div>
      <div className="menu-options">
        <div>
          <div>
            <RadioButton
              label="1 player"
              value={gameMode === 'single'}
              onChange={handleGameModeClick}
              disabled={gameInProgress}
            />
            <RadioButton
              label="2 players"
              value={gameMode === 'multiple'}
              onChange={handleGameModeClick}
              disabled={gameInProgress}
            />
          </div>
          <Button value="Reset" onClickHandler={handleResetClick} />
        </div>
      </div>
    </>
  );
}

export default App;
