import SquareModel from '../models/square';
import { Piece } from '../models/piece';
import { Score } from '../models/score';

import { calculateGameOver, calculateWinner } from './gameOver';
import { aiPlayer, humanPlayer } from '../models/constants';

/*
 * Function returning a function using closure for the players tuple.
 */
export function playerPiece(players: readonly [Piece, Piece]) {
  return (currentMove: number) => players[currentMove % 2];
}

/*
 * Determines the empty squares on the board, and returns
 * an array of the empty squares indices.
 */
function emptySquares(board: SquareModel[]): number[] {
  const availableMoves: number[] = [];
  board.forEach((square, index) => {
    if (!square.mark) {
      availableMoves.push(index);
    }
  });

  return availableMoves;
}

/* Makes and returns a copy of the board. */
function copyBoard(board: SquareModel[]): SquareModel[] {
  return board.map((square) => ({ ...square }));
}

/* Makes a copy of the board, places a piece on the board, and returns
 * the updated board.
 */
function move(
  board: SquareModel[],
  location: number,
  player: Piece
): SquareModel[] {
  const newBoard = copyBoard(board);
  newBoard[location].mark = player;
  return newBoard;
}

/*
 * Minimax logic for calculating the best move based.
 */
function minimax(
  board: SquareModel[],
  maximizing: boolean,
  currentMove: number,
  calcPlayerFromMove: (arg: number) => Piece
): Score {
  const winner = calculateWinner(board);
  const isDraw = calculateGameOver(board);
  const availableMoves = emptySquares(board);
  if (winner || isDraw || availableMoves.length === 0) {
    if (winner === humanPlayer) {
      return { score: -1, index: 0 };
    } else if (winner === aiPlayer) {
      return { score: 1, index: 0 };
    } else {
      return { score: 0, index: 0 };
    }
  }

  const moves: Score[] = [];

  for (let availIndex = 0; availIndex < availableMoves.length; availIndex++) {
    const moveIndex = availableMoves[availIndex];
    const newBoard = move(
      board,
      moveIndex,
      calcPlayerFromMove(currentMove + moveIndex)
    );
    const result = minimax(
      newBoard,
      !maximizing,
      currentMove + moveIndex,
      calcPlayerFromMove
    );
    moves.push({ index: moveIndex, score: result.score });
  }

  let bestScore = maximizing
    ? Number.NEGATIVE_INFINITY
    : Number.POSITIVE_INFINITY;
  let bestMove = -1;

  if (maximizing) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i].index;
      }
    }
  } else {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i].index;
      }
    }
  }

  return { index: bestMove, score: bestScore };
}

/*
 * Main entry point to call the minimax logic and return the best location.
 */

export function findBestMove(
  board: SquareModel[],
  players: readonly [Piece, Piece],
  currentMove: number
): number {
  const newBoard = copyBoard(board);
  const calcPlayerFromMove = playerPiece(players);

  const bestMove = minimax(newBoard, true, currentMove, calcPlayerFromMove);
  return bestMove.index;
}
