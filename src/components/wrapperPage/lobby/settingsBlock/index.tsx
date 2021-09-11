import React, { useState } from 'react';
import { Checker } from '../../../common/checker';
import './settingsBlock.css';

export default function SettingsBlock(): JSX.Element {
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
  const [cardValues, setCardValues] = useState('');

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
        setCardCoverAll((praveState) => [...praveState, reader.result as string]);
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
          <h3 className="setting__item-title">Add card values:</h3>
          <div className="setting-card-wrap">
            <div className="setting__card-value"></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
