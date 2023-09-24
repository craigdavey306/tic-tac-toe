import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameState, Player, BoardSquare } from '../models';
import { BOARD_SIZE, WIN_POSITIONS } from '../constants';

const calculateWinner = (squares: BoardSquare[]) => {
  for (const [a, b, c] of WIN_POSITIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const determineGameOver = (squares: BoardSquare[]) => {
  return squares.filter((square) => !square).length === 0;
};

const initialState: GameState = {
  moveCounter: 0,
  players: ['X', 'O'],
  board: Array<Player | null>(BOARD_SIZE).fill(null),
  currentPlayer: 'X',
  currentWinner: null,
  playerStats: { X: 0, O: 0 },
  gameOver: false,
};

const gameSlice = createSlice({
  name: 'tic-tac-toe',
  initialState,
  reducers: {
    placeMark: (state, action: PayloadAction<number>) => {
      const currentPlayer = state.currentPlayer;
      state.board[action.payload] = currentPlayer;

      const winner = calculateWinner(state.board);

      if (winner) {
        state.currentWinner = winner;
        state.playerStats[winner]++;
        state.gameOver = true;
        state.currentPlayer = null;
        return;
      }

      const gameOver = determineGameOver(state.board);

      if (gameOver) {
        state.gameOver = true;
        state.currentPlayer = null;
        return;
      }

      state.currentPlayer = state.players[(state.moveCounter + 1) % 2];
      state.moveCounter++;
    },
    resetGame: (state) => {
      const playerStats = state.playerStats;
      return { ...initialState, playerStats };
    },
  },
});

const store = configureStore({ reducer: gameSlice.reducer });

export const { placeMark, resetGame } = gameSlice.actions;

export default store;
