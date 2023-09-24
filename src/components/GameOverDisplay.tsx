import { FC } from 'react';
import './GameOverDisplay.css';

type GameOverProps = {
  message: string;
};

const GameOverDisplay: FC<GameOverProps> = ({ message }) => {
  return (
    <div className=".main-container">
      <p id="winner-text">{message}</p>
    </div>
  );
};

export default GameOverDisplay;
