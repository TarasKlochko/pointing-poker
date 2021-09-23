import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MemberCardKind } from '../../../model/MemberCardKind';
import { GameState, Room } from '../../../model/Room';
import { changeGameState, setMemberVote, upDateIssue } from '../../../slices/GameSlice';
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
import PlayCards from '../../common/playCard';
import AdmitRejectNewMember from './admitRejectNewMember';
import { MemberVote, MemberVoteStatus } from '../../../model/MemberVote';

export default function GamePage(): JSX.Element {
  const game = useAppSelector((state) => state.game);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const currentIssue = useAppSelector((state) => state.game.memberVote.currentIssue);
  const [isTimerOver, setIsTimerOver] = useState(false);
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
    Controller.startRound(socket, game.room.roomID, currentIssue + 1);
  }

  function handleRestartRound() {
    console.log('Restart Round');
    setIsTimerOver(false);
    const changeIssue = { ...game.room.issues[currentIssue] };
    changeIssue.name = 'issue5';
    dispatch(upDateIssue(changeIssue));
    Controller.startRound(socket, game.room.roomID, currentIssue);
  }

  function handleNextIssue() {
    console.log('Next issue');
    setIsTimerOver(false);
    Controller.startRound(socket, game.room.roomID, currentIssue + 1);
  }

  function handleTimerOver() {
    setIsTimerOver(!isTimerOver);
  }

  function handleCreateIssue(issue: Issue) {
    setIssues((prevState) => [...prevState, issue]);
  }

  useEffect(() => {
    socket.on("getVoteResults", (roomObj): void => {
      console.log('update');
      console.log(roomObj);
    })
  }, [socket]);

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
                  current={game.memberVote.currentIssue === index}
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
                {game.memberVote.status === MemberVoteStatus.BEFORE_START  && (
                  <button className="issues__control-button" onClick={handleRunRound}>
                    {isTimer ? 'Run Round' : 'Run'}
                  </button>
                )}
                {game.memberVote.status === MemberVoteStatus.FINISHED && (
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
        {((user.user.role === UserRole.DEALER && game.room.gameSettings.isMasterAsPlayer)
          || user.user.role === UserRole.PLAYER) && game.memberVote.status === MemberVoteStatus.IN_PROGRESS 
          ? <PlayCards></PlayCards> : <></>}
      </div>
      <div className="game__score">
        <VoteBlock></VoteBlock>
      </div>
      {user.user.role === UserRole.DEALER && <AdmitRejectNewMember />}
    </section>
  );
}
