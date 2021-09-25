import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { MemberVoteStatus } from '../../../model/MemberVote';
import './timer.css';

export default function Timer(): JSX.Element {
  const settings = useAppSelector((state) => state.game.room.gameSettings);
  const [minutes, setMinutes] = useState(settings.timeMin);
  const [seconds, setSeconds] = useState(settings.timeSec);
  const voteStatus = useAppSelector((state) => state.game.memberVote.status);

  useEffect(() => {
    if (voteStatus === MemberVoteStatus.IN_PROGRESS) {
      setTimeout(() => {
        if (seconds !== '00') {
          setSeconds((Number(seconds) - 1).toString().padStart(2, '0'));
        } else if (seconds === '00' && minutes !== '0') {
          setMinutes((Number(minutes) - 1).toString());
          setSeconds('59');
        }      
      }, 1000);}
      else {
        setMinutes(settings.timeMin);
        setSeconds(settings.timeSec);
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
