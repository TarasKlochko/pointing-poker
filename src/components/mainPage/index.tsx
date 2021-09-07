import React from 'react';
import { Popup } from './popup';
import './mainPage.css';
import { isObsorverShow, isPopupAction } from './popup/popupSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createGameAction, IDGameAction } from './createGame.slice';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPopup = useAppSelector((state) => state.popup.isPopup);

  function handleClickStart() {
    dispatch(isPopupAction(true));
    dispatch(isObsorverShow(false));
    dispatch(createGameAction(true));
  }
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(IDGameAction(event.target.value));
  }
  function handleClickConnect() {
    dispatch(createGameAction(false));
    dispatch(isPopupAction(true));
    dispatch(isObsorverShow(true));
  }

  return (
    <section className="main-page">
      <h1 className="main-page__title">
        Poker <span className="main-page__title_under">Planning</span>
      </h1>

      <h2 className="main-page__subtitle main-page__subtitle_start">Start your planning:</h2>
      <div className="main-page__wrap">
        <p className="main-page__label">Create session:</p>
        <button className="main-page__button" onClick={handleClickStart}>
          Start new game
        </button>
      </div>

      <h2 className="main-page__subtitle main-page__subtitle_or">OR:</h2>
      <p className="main-page__label">
        Connect to lobby by <span className="main-page__label_id">ID</span>:
      </p>
      <div className="main-page__wrap">
        <input className="main-page__input" type="numtextber" onChange={handleInput} />
        <button className="main-page__button" onClick={handleClickConnect}>
          Connect
        </button>
      </div>
      {isPopup && <Popup></Popup>}
    </section>
  );
}
