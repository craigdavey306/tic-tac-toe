import { WIN_POSITIONS } from '../models/constants';
import BoardSquare from '../models/square';

export function calculateWinner(squares: BoardSquare[]) {
  for (const [a, b, c] of WIN_POSITIONS) {
    if (
      squares[a].player === squares[b].player &&
      squares[a].player === squares[c].player
    ) {
      if (squares[a].player) {
        return squares[a].player;
      }
    }
  }
  return null;
}

export function calculateGameOver(squares: BoardSquare[]): boolean {
  return squares.filter((square) => !square.player).length === 0;
}
