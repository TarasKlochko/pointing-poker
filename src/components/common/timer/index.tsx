import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { MemberVoteStatus } from '../../../model/MemberVote';
import './timer.css';

export default function Timer(props: { min: string; sec: string; start: boolean }): JSX.Element {
  const [minutes, setMinutes] = useState(props.min);
  const [seconds, setSeconds] = useState(props.sec);
  const voteStatus = useAppSelector((state) => state.game.memberVote.status);

  useEffect(() => {
    let time: NodeJS.Timeout = new NodeJS.Timeout;
    if (voteStatus === MemberVoteStatus.IN_PROGRESS) {
      time = setTimeout(() => {
        if (seconds !== '00') {
          setSeconds((Number(seconds) - 1).toString().padStart(2, '0'));
        } else if (seconds === '00' && minutes !== '0') {
          setMinutes((Number(minutes) - 1).toString());
          setSeconds('59');
        }      
      }, 1000);}
    else {
      clearTimeout(time);
    }
  }, [voteStatus, seconds]);

  return (
    <div className="timer">
      <span className="timer__min">{minutes}</span>
      <span className="timer__sep">:</span>
      <span className="timer__sec">{seconds}</span>
    </div>
  );
}
