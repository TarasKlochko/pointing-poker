import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import ExportToExcel from './exportToExcel';
import GameCard from '../../common/gameCard';
import CardIssue from '../gamePage/cardIssue';
import './resultPage.css';

export type ResultInfo = {
  column1: string;
  column2: string;
  column3?: string;
  column4?: string;
};

export default function ResultPage(): JSX.Element {
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const fileName = 'game-result';
  const issues = useAppSelector((state) => state.game.room.issues);
  const resultReal: ResultInfo[] = [];

  issues.forEach((issue) => {
    resultReal.push(
      { column1: 'Issue', column2: issue.name },
      { column1: 'Priority', column2: issue.priority },
      { column1: 'Score', column2: issue.score || '-' },
      {
        column1: 'Link',
        column2: issue.link,
      },
    );
    if (issue.statistic) {
      resultReal.push({ column1: 'Cards:', column2: '№', column3: 'Value', column4: 'Percentage' });
      issue.statistic?.forEach((obj, index) => {
        resultReal.push({ column1: '', column2: (index + 1).toString(), column3: obj.value, column4: obj.percentage });
      });
    }

    resultReal.push({ column1: '', column2: '' });
  });

  return (
    <section className="result">
      <ul className="result__list">
        {issues.map((issue) => (
          <li className="result__item" key={issue.id}>
            <CardIssue issue={issue.name} priority={issue.priority} link={issue.link} score={'-'} current={false} />
            <div className="result__item-info-wrap">
              {
                issue.statistic ?  (
                  issue.statistic?.map((statisticItem, key) => (
                    <div key={key} className="result__item-info">
                      <GameCard value={statisticItem.value} scopeTypeShort={gameSettings.scopeTipeShort} />
                      <div className="result__item-info-score">{`${statisticItem.percentage} %`}</div>
                    </div>
                  ))
                ) : (<div className="result__item-info-score"> unknown </div>)
              }
            </div>
          </li>
        ))}
      </ul>
      <ExportToExcel data={resultReal} fileName={fileName} />
    </section>
  );
}
