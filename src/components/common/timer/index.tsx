import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { MemberVoteStatus } from '../../../model/MemberVote';
import './timer.css';

export default function Timer(): JSX.Element {
  const settings = useAppSelector((state) => state.game.room.gameSettings);
  const timer = useAppSelector((state) => state.game.memberVote.timer);
  const [minutes, setMinutes] = useState(timer ? timer!.min : parseInt(settings.timeMin, 10));
  const [seconds, setSeconds] = useState(timer ? timer!.sec : parseInt(settings.timeSec, 10));
  const voteStatus = useAppSelector((state) => state.game.memberVote.status);


  useEffect(() => {
    if (voteStatus === MemberVoteStatus.IN_PROGRESS) {
      setTimeout(() => {
        if (seconds !== 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes !== 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }      
      }, 1000);
    } else {
      setMinutes(parseInt(settings.timeMin, 10));
      setSeconds(parseInt(settings.timeSec, 10));
    }
  }, [voteStatus, seconds]);

  return (
    <div className="timer">
      <span className="timer__min">{minutes.toString().padStart(2, '0')}</span>
      <span className="timer__sep">:</span>
      <span className="timer__sec">{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}
