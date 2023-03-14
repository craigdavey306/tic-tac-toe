import React from 'react';

type Props = {
  label: string;
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
};

const RadioButton: React.FC<Props> = ({ label, value, onChange, disabled }) => {
  return (
    <label>
      <input
        type={'radio'}
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
};

export default RadioButton;
