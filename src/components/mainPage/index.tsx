import React from 'react';
import { ConnectPopup } from './connectPopup';
import './mainPage.css';

export default function MainPage(): JSX.Element {
  return (
    <section className="main-page">
      <h1 className="main-page__title">
        Poker <span className="main-page__title_under">Planning</span>
      </h1>

      <h2 className="main-page__subtitle main-page__subtitle_start">Start your planning:</h2>
      <div className="main-page__wrap">
        <p className="main-page__label">Create session:</p>
        <button className="main-page__button">Start new game</button>
      </div>

      <h2 className="main-page__subtitle main-page__subtitle_or">OR:</h2>
      <p className="main-page__label">
        Connect to lobby by <span className="main-page__label_id">ID</span>:
      </p>
      <div className="main-page__wrap">
        <input className="main-page__input" type="numtextber" />
        <button className="main-page__button">Connect</button>
      </div>
      <ConnectPopup></ConnectPopup>
    </section>
  );
}
