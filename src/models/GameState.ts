import { Player } from './Player';

export type BoardSquare = Player | null;
export type PlayerStats = { X: number; O: number };

export default interface GameState {
  moveCounter: number;
  players: [Player, Player];
  board: BoardSquare[];
  currentPlayer: Player | null;
  currentWinner: Player | null;
  playerStats: PlayerStats;
  gameOver: boolean;
}
