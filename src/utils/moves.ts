import BoardSquare from '../models/square';
import { Piece } from '../models/piece';
import { calculateWinner } from './index';

import { AI_PLAYER, HUMAN_PLAYER } from '../models/constants';

interface MoveScore {
  score: number;
  index?: number;
}

/* Makes and returns a copy of the board to keep the original in tact. */
function copyBoard(board: BoardSquare[]): BoardSquare[] {
  return board.map((square) => ({ ...square }));
}

/*
 * Determines the empty squares on the board, and returns
 * an array of the empty squares indices.
 */
function emptySquares(board: BoardSquare[]): number[] {
  const availableSquares: number[] = [];
  board.forEach((square, index) => {
    if (!square.player) {
      availableSquares.push(index);
    }
  });

  return availableSquares;
}

/* Recursive function to determine the best move for the computer player. */
function minimax(board: BoardSquare[], currentPlayer: Piece): MoveScore {
  const availSquares = emptySquares(board);

  // Base case - Check to see if there is a winner, or if there are no available squares.
  if (isWinner(board, AI_PLAYER)) {
    return { score: -1 };
  } else if (isWinner(board, HUMAN_PLAYER)) {
    return { score: 1 };
  } else if (availSquares.length === 0) {
    return { score: 0 };
  }

  const moves: MoveScore[] = [];

  // Try moving to the different available spaces.
  for (let square of availSquares) {
    const sqPlayer = board[square].player;
    board[square].player = currentPlayer;

    const move = minimax(board, nextPlayer(currentPlayer));

    board[square].player = sqPlayer;
    moves.push({ score: move.score, index: move.index ?? square });
  }

  let bestMove = 0;

  if (currentPlayer === AI_PLAYER) {
    let bestScore = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Number.POSITIVE_INFINITY;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

/* Calls the minimax function to find the best possible move. */
export function findBestMove(board: BoardSquare[], player: Piece): number {
  const newBoard = copyBoard(board);

  const bestMove = minimax(newBoard, player);

  if (!bestMove.index && bestMove.index !== 0) {
    throw Error('Invalid best move index returned from minimax function.');
  }

  return bestMove.index;
}

/* Determine the next player based on the current player value. */
export function nextPlayer(player: Piece): Piece {
  return player === 'X' ? 'O' : 'X';
}

/* Determines if the player won the game. */
export function isWinner(board: BoardSquare[], player: Piece): boolean {
  const winner = calculateWinner(board);
  return player === winner;
}
