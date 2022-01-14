import React, { useState } from 'react';
import InputMask from 'react-input-mask';

interface TimeInputProps {
  time?: string;
  onChange: (value: string) => void;
}

const TimeInput = React.forwardRef((props: TimeInputProps, ref) => {
  const [time, setTime] = useState(props.time || '');
  const startsWithTwo = time[0] === '2';

  const handleInput = ({ target: { value } }) => {
    setTime(value);
    props.onChange(value);
  };

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ];

  return (
    <InputMask
      ref={ref}
      {...props}
      mask={mask}
      className="form-input"
      placeholder="12:30"
      onChange={handleInput}
      value={time}
    />
  );
});

export default TimeInput;
