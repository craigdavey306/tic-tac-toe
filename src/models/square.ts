import { Piece } from './piece';

export default interface BoardSquare {
  player: Piece | null;
}
