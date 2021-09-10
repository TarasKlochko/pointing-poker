import React, { useState } from 'react';
import { Checker } from '../../../common/checker';
import './settingsBlock.css';
import coffee from '../../../../assets/coffee.png';

export default function SettingsBlock(): JSX.Element {
  const fibonacci = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  const poverOfTwo = ['0', '1/2', '2', '4', '8', '16', '32', '64', '128'];

  const [isMasterAsPlayer, setIsMasterAsPlayer] = useState(true);
  const [isAutoNewPlayer, setIsAutoNewPlayer] = useState(true);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [isAutoCardFlipping, setIsAutoCardFlipping] = useState(true);
  const [isTimer, setIsTimer] = useState(false);
  const [scopeTipe, setScopeTipe] = useState('');
  const [scopeTipeShort, setScopeTipeShort] = useState('');
  const [time, setTime] = useState('');
  const [timeMin, setTimeMin] = useState('2');
  const [timeSec, setTimeSec] = useState('00');
  const [cardCoverAll, setCardCoverAll] = useState<string[]>([]);
  const [cardCover, setCardCover] = useState('5');
  const [cardValues, setCardValues] = useState<string[]>(fibonacci);
  const [isCustomCardsInput, setIsCustomCardsInput] = useState(false);
  const [cardValuesCustom, setCardValuesCustom] = useState<string[]>([]);
  const [isChangeButton, setIsChangeButton] = useState(false);

  function handleScopeType(event: React.ChangeEvent<HTMLInputElement>) {
    setScopeTipe(event.currentTarget.value);
  }

  function handleScopeTypeShort(event: React.ChangeEvent<HTMLInputElement>) {
    setScopeTipeShort(event.currentTarget.value);
  }

  function handleTimeMin(event: React.ChangeEvent<HTMLInputElement>) {
    const minite = event.currentTarget.value;

    if (Number(minite) <= 59 && Number(minite) > 0) {
      setTimeMin(minite);
    } else if (Number(minite) === 0) {
      setTimeMin('');
    }
  }

  function handleTimeSec(event: React.ChangeEvent<HTMLInputElement>) {
    const second = event.currentTarget.value;

    if (Number(second) <= 59 && second.length <= 2) {
      setTimeSec(second);
    }
  }

  function handleOnblur() {
    if (!timeMin) {
      setTimeMin('0');
    }
    if (!timeSec || timeSec === '0') {
      setTimeSec('00');
    }
    if (timeSec.length === 1) {
      setTimeSec(`0${timeSec}`);
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
      setCardCover(coverName);
    } else {
      setCardCover(cover);
    }
  }

  function changeCardValues(arr: string[]) {
    setCardValues((prevState) =>
      [...prevState].filter((el) => el === 'coffee' || el === '?' || el === '∞').concat(arr),
    );
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
      setCardValues((prevState) => [...prevState, name]);
    } else {
      setCardValues((prevState) => [...prevState].filter((el) => el !== name));
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

  return (
    <div className="setting">
      <h2 className="setting__title">Game settings</h2>

      <ul className="setting__list">
        <li className="setting__item">
          <h3 className="setting__item-title">Scram master as player:</h3>
          <Checker stateName={isMasterAsPlayer} setState={setIsMasterAsPlayer}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Auto confirm new player:</h3>
          <Checker stateName={isAutoNewPlayer} setState={setIsAutoNewPlayer}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Changing card in round end:</h3>
          <Checker stateName={isChangingCard} setState={setIsChangingCard}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Auto card flipping:</h3>
          <Checker stateName={isAutoCardFlipping} setState={setIsAutoCardFlipping}></Checker>
        </li>
        <li className="setting__item">
          <h3 className="setting__item-title">Is timer needed:</h3>
          <Checker stateName={isTimer} setState={setIsTimer}></Checker>
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
              onKeyDown={(event) => ['e', 'E', '+', '-', ',', '.'].includes(event.key) && event.preventDefault()}
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
              onKeyDown={(event) => ['e', 'E', '+', '-', ',', '.'].includes(event.key) && event.preventDefault()}
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
            {cardValues &&
              cardValues.map((el, index) => (
                <div className="setting__card-value" key={index}>
                  <span className="setting__card-value-type">{scopeTipeShort}</span>
                  {el === 'coffee' ? <img src={coffee} alt="df" className="setting__card-value-img" /> : el}
                  <span className="setting__card-value-type">{scopeTipeShort}</span>
                </div>
              ))}
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
