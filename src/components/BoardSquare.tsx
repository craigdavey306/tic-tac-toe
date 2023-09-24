import './BoardSquare.css';
import { Player } from '../models';

type BoardSquareProps = {
  value: Player | null;
  handleOnClick?: () => void;
};

const BoardSquare: React.FC<BoardSquareProps> = ({ value, handleOnClick }) => {
  return (
    <button className="board-square" disabled={!!value} onClick={handleOnClick}>
      {value}
    </button>
  );
};

export default BoardSquare;
