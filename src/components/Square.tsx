import React from 'react';
import './Square.css';

import { Mark } from '../models/square';

type Props = {
  value: Mark;
  onSquareClick: () => void;
};

const Square: React.FC<Props> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
