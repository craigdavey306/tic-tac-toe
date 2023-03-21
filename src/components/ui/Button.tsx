import React from 'react';
import './Button.css';

type Props = {
  value: string;
  onClickHandler: () => void;
  classNameStr?: string;
};

const Button: React.FC<Props> = ({ value, onClickHandler, classNameStr }) => {
  return (
    <button className="button-default" onClick={onClickHandler}>
      {value}
    </button>
  );
};

export default Button;
