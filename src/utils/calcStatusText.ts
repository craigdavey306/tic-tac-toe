import { Piece } from '../models/piece';

export function calcStatusText(
  winner: Piece,
  gameIsOver: boolean,
  player: Piece
): string {
  if (winner) {
    return `Winner is ${winner}!`;
  } else if (gameIsOver) {
    return 'Game ended in a draw!';
  } else {
    return `Current player: ${player}`;
  }
}
