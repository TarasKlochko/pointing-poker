import React, { useEffect, useState } from 'react';
import './timer.css';

export default function Timer(props: { min: string; sec: string; start: boolean }): JSX.Element {
  const [minutes, setMinutes] = useState(props.min);
  const [seconds, setSeconds] = useState(props.sec);

  useEffect(() => {
    if (props.start) {
      const time = setInterval(() => {
        if (seconds !== '00') {
          setSeconds((Number(seconds) - 1).toString().padStart(2, '0'));
        } else if (seconds === '00' && minutes !== '0') {
          setMinutes((Number(minutes) - 1).toString());
          setSeconds('59');
        } else {
          console.log('Stop');
        }
        clearInterval(time);
      }, 500);
    }
  }, [seconds, props.start]);

  return (
    <div className="timer">
      <span className="timer__min">{minutes}</span>
      <span className="timer__sep">:</span>
      <span className="timer__sec">{seconds}</span>
    </div>
  );
}
