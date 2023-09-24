import { FC } from 'react';
import './ResetButton.css';

type ResetButtonProps = {
  handleOnClick: () => void;
};

const ResetButton: FC<ResetButtonProps> = ({ handleOnClick }) => {
  return (
    <button className="reset-button" onClick={handleOnClick}>
      Play Again
    </button>
  );
};

export default ResetButton;
