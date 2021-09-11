import React from 'react';
import coffee from '../../../assets/coffee.png';
import { useAppSelector } from '../../../app/hooks';
import './card.css';

export default function Card(props: { value: string }): JSX.Element {
  const scopeTipeShort = useAppSelector((state) => state.gameSettings.scopeTipeShort);
  return (
    <div className="card">
      <span className="card__value-type">{scopeTipeShort}</span>
      {props.value === 'coffee' ? <img src={coffee} alt="df" className="card__value-img" /> : props.value}
      <span className="card__value-type">{scopeTipeShort}</span>
    </div>
  );
}
