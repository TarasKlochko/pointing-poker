import React from 'react';
import './connectPopup.css';

export function ConnectPopup() {
  return (
    <div className="popup">
      <div className="popup__top">
        <h1 className="popup__title">Connect to lobby</h1>
        <div className="popup__observer">
          <p className="popup__observer-title">Connect as Observer</p>
          <div className="popup__observer-check"></div>
        </div>
      </div>
      <form className="popup__form">
        <label className="popup__label" htmlFor="name">
          Your first name:
        </label>
        <input className="popup__input" id="name" type="text" />

        <label className="popup__label" htmlFor="last-name">
          Your last name (optional):
        </label>
        <input className="popup__input" id="last-name" type="text" />

        <label className="popup__label" htmlFor="job-position">
          Your job position (optional):
        </label>
        <input className="popup__input" id="job-position" type="text" />

        <label className="popup__label" htmlFor="job-position">
          Image:
        </label>
        <div className="popup__input-image-wrap">
          <input
            className="popup__input popup__input_image"
            id="popup-input-image"
            type="file"
            placeholder="Choose file"
          />
          <label htmlFor="popup-input-image" className="popup__label-image">
            <span className="popup__image-file-name"></span>
            <span className="popup__button popup__image-button">Button</span>
          </label>
        </div>
        <img className="popup__avatar" src="" alt="" />
        <div className="popup__btn-wrap">
          <button className="popup__button popup__button_main" type="submit">
            Confirm
          </button>
          <button className="popup__button popup__button_main popup__button_cancel" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
