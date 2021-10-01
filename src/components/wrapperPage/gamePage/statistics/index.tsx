import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IssueUtil } from '../../../../utils/IssueUtil';
import GameCard from '../../../common/gameCard';
import './statistics.css';

export default function Statistics(props: { values: string; percentage: string }) {
  const gameSettings = useAppSelector((state) => state.game.room.gameSettings);
  const currentIssue = useAppSelector((state) => state.game.memberVote.currentIssue);
  const issues = useAppSelector((state) => state.game.room.issues);
  const statistics = IssueUtil.getCurrentIssueStatistics(issues, currentIssue);
  return (
    <div>
      <h2 className="statistic__title">Statistics:</h2>
      <div className="statistic__wrap">
        {statistics &&
          statistics.map((statisticItem, index) => (
            <div key={index} className="statistic__card-wrap">
              <GameCard value={statisticItem.value} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
              <div className="statistic__score">{`${Number(statisticItem.percentage).toFixed(2)} %`}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
