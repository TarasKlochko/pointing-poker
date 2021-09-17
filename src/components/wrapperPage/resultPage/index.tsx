import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import GameCard from '../../common/gameCard';
import CardIssue from '../gamePage/cardIssue';
import './resultPage.css';

export default function ResultPage(): JSX.Element {
  const issues = useAppSelector((state) => state.game.room.issues);
  const gameSettings = useAppSelector((state) => state.gameSettings);

  return (
    <section className="result">
      <ul className="result__list">
        {issues.map((issue) => (
          <li className="result__item" key={issue.id}>
            <CardIssue issue={issue.name} priority={issue.priority} link={issue.link} score={'-'} current={false} />
            <div className="result__item-info-wrap">
              <div className="result__item-info">
                <GameCard value={'10'} scopeTypeShort={gameSettings.scopeTipeShort} />
                <div className="result__item-info-score">15.3%</div>
              </div>
              <div className="result__item-info">
                <GameCard value={'WWWW'} scopeTypeShort={gameSettings.scopeTipeShort} />
                <div className="result__item-info-score">15.3%</div>
              </div>
              <div className="result__item-info">
                <GameCard value={'15'} scopeTypeShort={gameSettings.scopeTipeShort} />
                <div className="result__item-info-score">15.3%</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
