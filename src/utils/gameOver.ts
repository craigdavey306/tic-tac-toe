import SquareModel from '../models/square';
import { Piece } from '../models/piece';

import { WIN_POSITIONS } from '../models/constants';

export function calculateWinner(squares: SquareModel[]): Piece {
  for (const [a, b, c] of WIN_POSITIONS) {
    if (
      squares[a].mark === squares[b].mark &&
      squares[a].mark === squares[c].mark
    ) {
      return squares[a].mark;
    }
  }
  return null;
}

export function calculateGameOver(squares: SquareModel[]): boolean {
  return squares.filter((square) => !square.mark).length === 0;
}
