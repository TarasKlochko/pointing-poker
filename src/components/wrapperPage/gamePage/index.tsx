import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MemberCardKind } from '../../../model/MemberCardKind';
import { GameState, Room } from '../../../model/Room';
import { changeGameState, upDateIssue } from '../../../slices/GameSlice';
import MemberCard from '../../common/memberCard';
import CardIssue from './cardIssue';
import './gamePage.css';
import Timer from '../../common/timer';
import { UserRole } from '../../../model/UserRole';
import Statistics from './statistics';
import CreateIssueButton from '../../common/issue/CreateIssueButton';
import { Issue } from '../../../model/Issue';
import { Controller } from '../../../api/Controller';
import VoteBlock from './voteBlock/VoteBlock';
import { MemberVoteStatus } from '../../../model/MemberVote';
import PlayCards from '../../common/playCard';
import AdmitRejectNewMember from './admitRejectNewMember';

export default function GamePage(): JSX.Element {
  const game = useAppSelector((state) => state.game);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const [isRunRound, setIsRunRound] = useState(false);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(-1);
  const isTimer = useAppSelector((state) => state.game.room.gameSettings.isTimer);
  const issues = useAppSelector((state) => state.game.room.issues);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [issuesArr, setIssues] = useState<Issue[]>(issues);
  const socket = useAppSelector((state) => state.socket.socket);

  function handleStopGame() {
    console.log('Stop Game');
    dispatch(changeGameState(GameState.RESULT));
  }

  function handleExit() {
    console.log('Exit');
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

  function handleCreateIssue(issue: Issue) {
    setIssues((prevState) => [...prevState, issue]);
  }

  useEffect(() => {
    const NewRoom: Room = {
      roomID: game.room.roomID,
      name: game.room.name,
      state: game.room.state,
      issues: issuesArr,
      gameSettings: game.room.gameSettings,
      members: game.room.members,
    };
    Controller.updateRoom(socket, NewRoom);
  }, [issuesArr]);

  return (
    <section className="game">
      <div className="game__main main">
        <h2 className="main__title">{game.room.name}</h2>
        <div className="main__top top">
          <div className="top__master-wrap">
            <h3 className="top__master-title">Scrum master:</h3>
            <MemberCard user={game.dealer} kind={MemberCardKind.SIMPLE} />
          </div>
          {user.user.role === UserRole.PLAYER && isTimer && (
            <Timer min={gameSettings.timeMin} sec={gameSettings.timeSec} start={false} />
          )}

          {user.user.role === UserRole.DEALER && (
            <button className="top__button" onClick={handleStopGame}>
              Stop Game
            </button>
          )}
          {user.user.role === UserRole.PLAYER && (
            <button className="top__button" onClick={handleExit}>
              Exit
            </button>
          )}
        </div>

        <div className="main__central-wrap">
          <div className="main__issues issues">
            <h2 className="issuses__title">Issues:</h2>

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
              {user.user.role === UserRole.DEALER && <CreateIssueButton onClickHandler={handleCreateIssue} />}
            </div>
          </div>
          {user.user.role === UserRole.DEALER && (
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
          )}
          {user.user.role === UserRole.PLAYER && game.memberVote.status === MemberVoteStatus.FINISHED && (
            <Statistics values={'15'} percentage={'15.5%'} />
          )}
        </div>
        {user.user.role === UserRole.DEALER && game.memberVote.status === MemberVoteStatus.FINISHED && (
          <Statistics values={'15'} percentage={'15.5%'} />
        )}
        {user.user.role === UserRole.DEALER || user.user.role === UserRole.PLAYER ? <PlayCards></PlayCards> : <></>}
      </div>
      <div className="game__score">
        <VoteBlock></VoteBlock>
      </div>
      {user.user.role === UserRole.DEALER && <AdmitRejectNewMember />}
    </section>
  );
}
