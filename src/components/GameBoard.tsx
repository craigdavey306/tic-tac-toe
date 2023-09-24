import { useSelector, useDispatch } from 'react-redux';

import './GameBoard.css';
import { GameState, Player, PlayerStats } from '../models';
import { placeMark, resetGame } from '../store';
import BoardSquare from './BoardSquare';
import ResetButton from './ResetButton';
import PlayerDisplay from './PlayerDisplay';
import GameOverDisplay from './GameOverDisplay';

const GameBoard = () => {
  const dispatch = useDispatch();
  const gameSquares = useSelector<GameState, Array<Player | null>>(
    (state) => state.board
  );

  const currentPlayer = useSelector<GameState, Player | null>(
    (state) => state.currentPlayer
  );

  const gameOver = useSelector<GameState, boolean>((state) => state.gameOver);
  const winner = useSelector<GameState, Player | null>(
    (state) => state.currentWinner
  );
  const playerStats = useSelector<GameState, PlayerStats>(
    (state) => state.playerStats
  );

  function handleSquareOnClick(square: number) {
    dispatch(placeMark(square));
  }

  function handleResetGameOnClick() {
    dispatch(resetGame());
  }

  function generateBoardSquaresRow(indexes: number[]) {
    return indexes.map((index) => (
      <BoardSquare
        value={gameSquares[index]}
        handleOnClick={handleSquareOnClick.bind(null, index)}
      />
    ));
  }

  return (
    <main className="main-container">
      <div style={{ marginBottom: '16px' }}>
        <PlayerDisplay stats={playerStats} currentPlayer={currentPlayer} />
      </div>

      <div className="main-container__row">
        {generateBoardSquaresRow([0, 1, 2])}
      </div>
      <div className="main-container__row">
        {generateBoardSquaresRow([3, 4, 5])}
      </div>
      <div className="main-container__row">
        {generateBoardSquaresRow([6, 7, 8])}
      </div>

      {winner && <GameOverDisplay message={`${winner} won!`} />}
      {!winner && gameOver && <GameOverDisplay message={'Tied game!'} />}
      <div className="main-container__row">
        {gameOver && <ResetButton handleOnClick={handleResetGameOnClick} />}
      </div>
    </main>
  );
};

export default GameBoard;
