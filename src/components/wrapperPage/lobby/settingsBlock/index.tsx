import React, { useState } from 'react';
import { Checker } from '../../../common/checker';
import './settingsBlock.css';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  cardCoverAction,
  cardValuesAction,
  isAutoCardFlippingAction,
  isAutoNewPlayerAction,
  isChangingCardAction,
  isMasterAsPlayerAction,
  isTimerAction,
  scopeTipeShortAction,
  timeMinAction,
  timeSecAction,
} from './settingBlog.slice';
import Card from '../../../common/card';

export default function SettingsBlock(): JSX.Element {
  const fibonacci = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  const poverOfTwo = ['0', '1/2', '2', '4', '8', '16', '32', '64', '128'];
  const dispatch = useAppDispatch();
  const isMasterAsPlayer = useAppSelector((state) => state.gameSettings.isMasterAsPlayer);
  const cardValues = useAppSelector((state) => state.gameSettings.cardValues);
  const cardCover = useAppSelector((state) => state.gameSettings.cardCover);
  const isAutoNewPlayer = useAppSelector((state) => state.gameSettings.isAutoNewPlayer);
  const isAutoCardFlipping = useAppSelector((state) => state.gameSettings.isAutoCardFlipping);
  const isChangingCard = useAppSelector((state) => state.gameSettings.isChangingCard);
  const isTimer = useAppSelector((state) => state.gameSettings.isTimer);
  const timeMin = useAppSelector((state) => state.gameSettings.timeMin);
  const timeSec = useAppSelector((state) => state.gameSettings.timeSec);
  const [scopeTipe, setScopeTipe] = useState('');
  const [cardCoverAll, setCardCoverAll] = useState<string[]>([]);
  const [isCustomCardsInput, setIsCustomCardsInput] = useState(false);
  const [cardValuesCustom, setCardValuesCustom] = useState<string[]>([]);
  const [isChangeButton, setIsChangeButton] = useState(false);

  function handleIsMasterAsPlayerAction(fn: boolean) {
    dispatch(isMasterAsPlayerAction(fn));
  }

  function handleIsAutoNewPlayerAction(fn: boolean) {
    dispatch(isAutoNewPlayerAction(fn));
  }

  function handleIsChangingCardAction(fn: boolean) {
    dispatch(isChangingCardAction(fn));
  }

  function handleIsAutoCardFlippingAction(fn: boolean) {
    dispatch(isAutoCardFlippingAction(fn));
  }

  function handleIsTimerAction(fn: boolean) {
    dispatch(isTimerAction(fn));
  }

  function handleScopeType(event: React.ChangeEvent<HTMLInputElement>) {
    setScopeTipe(event.currentTarget.value);
  }

  function handleScopeTypeShort(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(scopeTipeShortAction(event.currentTarget.value));
  }

  function handleTimeMin(event: React.ChangeEvent<HTMLInputElement>) {
    const minite = event.currentTarget.value;

    if (Number(minite) <= 59 && Number(minite) > 0) {
      dispatch(timeMinAction(minite));
    } else if (Number(minite) === 0) {
      dispatch(timeMinAction(''));
    }
  }

  function handleTimeSec(event: React.ChangeEvent<HTMLInputElement>) {
    const second = event.currentTarget.value;

    if (Number(second) <= 59 && second.length <= 2) {
      dispatch(timeSecAction(second));
    }
  }

  function handleOnblur() {
    if (!timeMin) {
      dispatch(timeMinAction('0'));
    }
    if (!timeSec || timeSec === '0') {
      dispatch(timeSecAction('00'));
    }
    if (timeSec.length === 1) {
      dispatch(timeSecAction(`0${timeSec}`));
    }
  }

  function handleAddCover(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.currentTarget?.files![0] as File;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCardCoverAll((prevState) => [...prevState, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCover(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const cardCoverEl = event.currentTarget;
    const allCardCoverEl = document.querySelectorAll('.setting__card-cover');
    allCardCoverEl.forEach((elem) => elem.classList.remove('setting__card-cover_active'));
    cardCoverEl.classList.add('setting__card-cover_active');
    const cover = getComputedStyle(cardCoverEl).backgroundImage;

    if (/backSides/.test(cover)) {
      const coverName = cover.split('backSides')[1].split('.')[0];
      dispatch(cardCoverAction(coverName));
    } else {
      dispatch(cardCoverAction(cover));
    }
  }

  function changeCardValues(arr: string[]) {
    dispatch(cardValuesAction([...cardValues].filter((el) => el === 'coffee' || el === '?' || el === '∞').concat(arr)));
  }

  function hanleSelectValue(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;

    if (value === 'Fibonacci') {
      changeCardValues(fibonacci);
      setIsCustomCardsInput(false);
      setIsChangeButton(false);
    }
    if (value === 'Pover of two') {
      changeCardValues(poverOfTwo);
      setIsCustomCardsInput(false);
      setIsChangeButton(false);
    }
    if (value === 'Custom') {
      changeCardValues([]);
      setCardValuesCustom([]);
      setIsCustomCardsInput(true);
    }
  }

  function handleCheckBoxValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.currentTarget;
    const { checked } = event.currentTarget;

    if (checked) {
      dispatch(cardValuesAction([...cardValues, name]));
    } else {
      dispatch(cardValuesAction([...cardValues].filter((el) => el !== name)));
    }
  }

  function handleValueInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const valueArr = Array.from(
      new Set(
        value
          .replaceAll(' ', '')
          .split(',')
          .filter((el) => el !== '')
          .map((el) => el.slice(0, 4)),
      ),
    );
    setCardValuesCustom(valueArr);
  }

  function handleAddNewCards() {
    changeCardValues(cardValuesCustom);
    setIsCustomCardsInput(false);
    setIsChangeButton(true);
  }

  function handleChangeCards() {
    setCardValuesCustom([]);
    changeCardValues([]);
    setIsCustomCardsInput(true);
    setIsChangeButton(false);
  }

  function handleSimbols(event: React.KeyboardEvent<HTMLInputElement>) {
    return ['e', 'E', '+', '-', ',', '.'].includes(event.key) && event.preventDefault();
  }

  return (
    <div className="setting">
      <h2 className="setting__title">Game settings</h2>

      <ul className="setting__list">
        <li className="setting__item">
          <h3 className="setting__item-title">Scram master as player:</h3>
          <Checker stateName={isMasterAsPlayer} setState={handleIsMasterAsPlayerAction}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Auto confirm new player:</h3>
          <Checker stateName={isAutoNewPlayer} setState={handleIsAutoNewPlayerAction}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Changing card in round end:</h3>
          <Checker stateName={isChangingCard} setState={handleIsChangingCardAction}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Auto card flipping:</h3>
          <Checker stateName={isAutoCardFlipping} setState={handleIsAutoCardFlippingAction}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Is timer needed:</h3>
          <Checker stateName={isTimer} setState={handleIsTimerAction}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Score type:</h3>
          <input type="text" className="setting__input" onChange={handleScopeType} />
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Score type (Short):</h3>
          <input type="text" className="setting__input" onChange={handleScopeTypeShort} />
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Round time:</h3>
          <div className="setting__input-time-wrap">
            <input
              type="number"
              className="setting__input-time setting__input-time_min"
              max="60"
              value={timeMin}
              onBlur={handleOnblur}
              onChange={handleTimeMin}
              onKeyDown={handleSimbols}
            />
            <span
              className={
                isTimer ? 'setting__input-time-sep' : 'setting__input-time-sep setting__input-time-sep_inactive'
              }
            >
              :
            </span>
            <input
              type="number"
              className="setting__input-time setting__input-time_sec"
              max="60"
              value={timeSec}
              onBlur={handleOnblur}
              onChange={handleTimeSec}
              onKeyDown={handleSimbols}
            />
          </div>
        </li>
        <li className="setting__item setting__item_card">
          <h3 className="setting__item-title">Select cover:</h3>
          <div className="setting-card-wrap">
            <div
              className="setting__card-cover setting__card-cover_1 setting__card-cover_active"
              data-name="backSides5"
              onClick={(event) => handleCover(event)}
            ></div>
            <div
              className="setting__card-cover setting__card-cover_2"
              data-name="backSides13"
              onClick={(event) => handleCover(event)}
            ></div>
            <div
              className="setting__card-cover setting__card-cover_3"
              data-name="backSides17"
              onClick={(event) => handleCover(event)}
            ></div>
            {cardCoverAll &&
              cardCoverAll.map((el, index) => (
                <div
                  className="setting__card-cover"
                  key={index}
                  style={{ backgroundImage: `url(${el})` }}
                  onClick={(event) => handleCover(event)}
                ></div>
              ))}
            <label className="setting__card-cover setting__card-cover_label" htmlFor="add-card">
              <input
                type="file"
                id="add-card"
                className="setting__card-cover setting__card-cover_add"
                onChange={handleAddCover}
              />
              Add new cover
            </label>
          </div>
        </li>
        <li className="setting__item setting__item_card">
          <div className="setting__card-value-select-wrap">
            <h3 className="setting__item-title">Add card values:</h3>
            <select className="setting__card-value-select" onChange={(event) => hanleSelectValue(event)}>
              <option className="setting__card-value-option" value="Fibonacci">
                Fibonacci
              </option>
              <option className="setting__card-value-option" value="Pover of two">
                Pover of two
              </option>
              <option className="setting__card-value-option" value="Custom">
                Custom
              </option>
            </select>
          </div>
          <label htmlFor="coffee" className="setting__card-value-check-label">
            Coffee card
            <input
              className="setting__card-value-check-box"
              type="checkbox"
              name="coffee"
              id="coffee"
              onChange={handleCheckBoxValue}
            />
          </label>
          <label htmlFor="?" className="setting__card-value-check-label">
            Question card
            <input
              className="setting__card-value-check-box"
              type="checkbox"
              name="?"
              id="coffee"
              onChange={handleCheckBoxValue}
            />
          </label>
          <label htmlFor="∞" className="setting__card-value-check-label">
            Infynity card
            <input
              className="setting__card-value-check-box"
              type="checkbox"
              name="∞"
              id="coffee"
              onChange={handleCheckBoxValue}
            />
          </label>
          <div className="setting-card-wrap">
            {cardValues && cardValues.map((el, index) => <Card value={el} key={index}></Card>)}
          </div>
          {isCustomCardsInput && (
            <>
              <h3 className="setting__card-value-add-title">
                Please enter the comma-separated values (max 4 characters)
              </h3>
              <input className="setting__card-value-add-input" type="text" onChange={handleValueInput} />
              <button
                className="setting__card-value-add-button"
                onClick={handleAddNewCards}
                disabled={cardValuesCustom.length < 1}
              >
                Add new cards
              </button>
            </>
          )}
          {isChangeButton && (
            <div className="setting__card-value-add-button" onClick={handleChangeCards}>
              Change cards
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
