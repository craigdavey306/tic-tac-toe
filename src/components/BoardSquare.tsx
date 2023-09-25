import './BoardSquare.css';
import { Player } from '../models';

type BoardSquareProps = {
  id: string;
  value: Player | null;
  handleOnClick?: () => void;
};

const BoardSquare: React.FC<BoardSquareProps> = ({
  value,
  handleOnClick,
  id,
}) => {
  return (
    <button
      id={id}
      className="board-square"
      disabled={!!value}
      onClick={handleOnClick}
    >
      {value}
    </button>
  );
};

export default BoardSquare;
