import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { MemberCardKind } from '../../../model/MemberCardKind';
import GameCard from '../../common/gameCard';
import MemberCard from '../../common/memberCard';
import CardIssue from './cardIssue';
import './gamePage.css';

export default function GamePage(): JSX.Element {
  const game = useAppSelector((state) => state.game);
  const [isRunRound, setIsRunRound] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  return (
    <section className="game">
      <div className="game__main main">
        <h2 className="main__title">Game issues</h2>
        <div className="main__top top">
          <div className="top__master-wrap">
            <h3 className="top__master-title">Scrum master:</h3>
            <MemberCard user={game.dealer} kind={MemberCardKind.SIMPLE} />
          </div>
          <button className="top__button">Stop Game</button>
        </div>
        <div className="main__issues issues">
          <h2 className="issuses__title">Issues:</h2>
          <div className="issues__wrap">
            <div className="issues__card-wrap">
              {<CardIssue issue={'Issue 123'} priority={'Low priority'} current={false} link={'link'} score={'-'} />}
              {<CardIssue issue={'Issue 124'} priority={'Low priority'} current={true} link={'link'} score={'-'} />}
              {<CardIssue issue={'Issue 125'} priority={'Low priority'} current={false} link={'link'} score={'15'} />}
            </div>
            {isTimer && (
              <div className="issues__control-wrap">
                <div className="issues__control-timer"></div>
                <div className="issues__control-buttons-wrap">
                  {!isRunRound && <div className="issues__control-button">Run Round</div>}
                  {isRunRound && (
                    <>
                      <div className="issues__control-button">Restart Round</div>
                      <div className="issues__control-button">Next ISSUE</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main__statistic statistic">
          <h2 className="statistic__title">Statistics:</h2>
          <div className="statistic__wrap">
            <div className="statistic__card-wrap">
              <GameCard value={'15'} scopeTypeShort={'SP'} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
            <div className="statistic__card-wrap">
              <GameCard value={'WWWW'} scopeTypeShort={'SP'} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
            <div className="statistic__card-wrap">
              <GameCard value={'15'} scopeTypeShort={'SP'} statistic={true} />
              <div className="statistic__score">15.3%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="game__score"></div>
    </section>
  );
}
