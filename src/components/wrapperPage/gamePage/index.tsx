import React, { useEffect, useState } from 'react';
import { Controller } from '../../../api/Controller';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MemberCardKind } from '../../../model/MemberCardKind';
import { GameState } from '../../../model/Room';
import { addIssue, changeGameState, upDateIssue } from '../../../slices/GameSlice';
import GameCard from '../../common/gameCard';
import MemberCard from '../../common/memberCard';
import CardIssue from './cardIssue';
import './gamePage.css';
import { Issue } from '../../../model/Issue';
import Timer from '../../common/timer';

export default function GamePage(): JSX.Element {
  const game = useAppSelector((state) => state.game);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const [isRunRound, setIsRunRound] = useState(false);
  // const [isTimer, setIsTimer] = useState(false);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(-1);
  const isTimer = useAppSelector((state) => state.gameSettings.isTimer);
  const issues = useAppSelector((state) => state.game.room.issues);
  const socket = useAppSelector((state) => state.socket.socket);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (!isTimer) {
  //     setCurrentIssue(0);
  //   }
  // }, []);

  function handleStopGame() {
    console.log('Stop Game');
    dispatch(changeGameState(GameState.RESULT));
  }

  function handleRunRound() {
    console.log('Run Round');
    setIsRunRound(true);
    if (currentIssue < 0) {
      setCurrentIssue(0);
    }
  }
  function handleRestartRound() {
    console.log('Restart Round');
    setIsTimerOver(false);
    // clean issue statistic/score
    const changeIssue = { ...game.room.issues[currentIssue] };
    changeIssue.name = 'issue5';
    dispatch(upDateIssue(changeIssue));
  }

  function handleNextIssue() {
    console.log('Next issue');
    setIsTimerOver(false);
    if (currentIssue < game.room.issues.length - 1) {
      setCurrentIssue(currentIssue + 1);
    }
  }

  function handleTimerOver() {
    setIsTimerOver(!isTimerOver);
  }

  return (
    <section className="game">
      <div className="game__main main">
        <h2 className="main__title">{game.room.name}</h2>
        <div className="main__top top">
          <div className="top__master-wrap">
            <h3 className="top__master-title">Scrum master:</h3>
            <MemberCard user={game.dealer} kind={MemberCardKind.SIMPLE} />
          </div>
          <button className="top__button" onClick={handleStopGame}>
            Stop Game
          </button>
        </div>
        <div className="main__issues issues">
          <h2 className="issuses__title">Issues:</h2>
          <div className="issues__wrap">
            <div className="issues__card-wrap">
              {issues.map((issue, index) => (
                <CardIssue
                  issue={issue.name}
                  priority={issue.priority}
                  link={issue.link}
                  score={'-'}
                  current={currentIssue === index}
                  key={issue.id}
                />
              ))}
            </div>

            <div className="issues__control-wrap">
              {isTimer && <Timer min={gameSettings.timeMin} sec={gameSettings.timeSec} start={false} />}
              <div className="issues__control-timer" onClick={handleTimerOver}></div>
              <div className="issues__control-buttons-wrap">
                {!isRunRound && (
                  <button className="issues__control-button" onClick={handleRunRound}>
                    {isTimer ? 'Run Round' : 'Run'}
                  </button>
                )}
                {isTimerOver && (
                  <>
                    <button className="issues__control-button" onClick={handleRestartRound}>
                      {isTimer ? 'Restart Round' : 'Restart'}
                    </button>
                    {currentIssue < game.room.issues.length - 1 && (
                      <button className="issues__control-button" onClick={handleNextIssue}>
                        Next ISSUE
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main__statistic statistic">
          <h2 className="statistic__title">Statistics:</h2>
          <div className="statistic__wrap">
            <div className="statistic__card-wrap">
              <GameCard value={'10'} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
            <div className="statistic__card-wrap">
              <GameCard value={'WWWW'} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
            <div className="statistic__card-wrap">
              <GameCard value={'15'} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="game__score"></div>
    </section>
  );
}
