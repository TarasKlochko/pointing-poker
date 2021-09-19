import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import GameCard from '../../../common/gameCard';
import './statistics.css';

export default function Statistics(props: { values: string; percentage: string }) {
  const gameSettings = useAppSelector((state) => state.gameSettings);
  return (
    <div className="main__statistic statistic">
      <h2 className="statistic__title">Statistics:</h2>
      <div className="statistic__wrap">
        <div className="statistic__card-wrap">
          <GameCard value={props.values} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
          <div className="statistic__score">{props.percentage}</div>
        </div>
        <div className="statistic__card-wrap">
          <GameCard value={props.values} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
          <div className="statistic__score">{props.percentage}</div>
        </div>
        <div className="statistic__card-wrap">
          <GameCard value={props.values} scopeTypeShort={gameSettings.scopeTipeShort} statistic={true} />
          <div className="statistic__score">{props.percentage}</div>
        </div>
      </div>
    </div>
  );
}
