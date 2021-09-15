import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checker } from '../../common/checker';
import './popup.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  avatarAction,
  clearPopupAction,
  isPopupAction,
  jobPositionAction,
  lastNameAction,
  nameAction,
  observerAction,
} from './popupSlice';
import { IDGameAction } from '../createGame.slice';
import { Controller, PopupData } from '../../../api/Controller';
import { User } from '../../../model/User';
import { setMembers } from '../../../slices/GameSlice';
import { setUser } from '../../../slices/UserSlice';
import { UserRole } from '../../../model/UserRole';

export function Popup(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isCreateGame = useAppSelector((state) => state.createGame.isCreateGame);
  const isObserverShow = useAppSelector((state) => state.popup.isObsorverShow);
  const observer = useAppSelector((state) => state.popup.popupData.observer);
  const $name = useAppSelector((state) => state.popup.popupData.name);
  const $lastName = useAppSelector((state) => state.popup.popupData.lastName);
  const $jobPosition = useAppSelector((state) => state.popup.popupData.jobPosition);
  const avatar = useAppSelector((state) => state.popup.popupData.avatar);
  const room = useAppSelector((state) => state.createGame.id);
  const popupData: PopupData = useAppSelector((state) => state.popup.popupData);
  const socket = useAppSelector((state) => state.socket.socket);
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  function createAvatarName() {
    let avatarName = 'NN';
    if ($name) {
      avatarName = $name[0] + $name[$name.length - 1];
    }
    if ($name && $lastName) {
      avatarName = $name[0] + $lastName[0];
    }
    return avatarName.toUpperCase();
  }

  function handleCheker(fn: boolean) {
    dispatch(observerAction(fn));
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'name') {
      dispatch(nameAction(event.target.value));
    }
    if (event.target.name === 'last-name') {
      dispatch(lastNameAction(event.target.value));
    }
    if (event.target.name === 'job-position') {
      dispatch(jobPositionAction(event.target.value));
    }
    if (event.target.name === 'image') {
      const file = event?.currentTarget?.files![0] as File;
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(avatarAction(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  }

  const createUserState = (userId: string, roomId: string, userRole: string): void => {
    dispatch(setUser({
      name: $name,
      surname: $lastName,
      id: userId,
      image: avatar,
      role: userRole,
      jobPosition: $jobPosition,
      room: roomId
    }))
  }

  function handleConfirm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if ($name) {
      if (isCreateGame) {
        Controller.createRoom(socket, popupData).then((responseObject) => {
          if (responseObject.status === 200) {
            console.log(responseObject);
            history.push(`/game/${responseObject.roomObj?.roomID}`);
            let roomID = '';
            if (responseObject.roomObj?.roomID) {
              roomID = responseObject.roomObj?.roomID;
            }
            dispatch(IDGameAction(responseObject.roomObj?.roomID as string));
            dispatch(isPopupAction(false));
            dispatch(clearPopupAction());
            createUserState(responseObject.userID!, roomID, UserRole.DEALER)
          } else {
            console.log('error: ', responseObject);
          }
        });
      } else if (user.user.id.length === 0) {
        Controller.login(socket, popupData, room).then(responseObject => {
          if (responseObject.status === 200) {
            console.log(responseObject);
            history.push(`/game/${responseObject.roomObj?.roomID}`);
            dispatch(isPopupAction(false));
            dispatch(clearPopupAction());
            let roomID = '';
            if (responseObject.roomObj?.roomID) {
              roomID = responseObject.roomObj?.roomID;
            }
            createUserState(responseObject.userID!, roomID, UserRole.PLAYER)
          } else {
            console.log('error: ', responseObject);
          }
        });
      } else {
        history.push(`/game/${room}`);
      }
    } else {
      setIsError(true);
    }
  }

  function handleCancel() {
    dispatch(clearPopupAction());
  }

  useEffect(() => {
    socket.on("users", users => {
      const usersO: User[] = users;
      console.log(usersO);
      dispatch(setMembers(usersO));
    })
  }, [socket])

  return (
    <div className="popup-wrapper">
      <div className="popup">
        <div className="popup__top">
          <h1 className="popup__title">{isCreateGame ? 'Create new game' : 'Connect to lobby'}</h1>
          {isObserverShow && (
            <div className="popup__observer">
              <p className="popup__observer-title">Connect as Observer</p>
              <Checker stateName={observer} setState={handleCheker}></Checker>
            </div>
          )}
        </div>
        <form className="popup__form">
          <label className="popup__label" htmlFor="name">
            Your first name:
          </label>{' '}
          {isError && <p className="popup__form-error">Please enter your first name</p>}
          <input className="popup__input" id="name" type="text" name="name" onChange={(event) => handleInput(event)} />
          <label className="popup__label" htmlFor="last-name">
            Your last name (optional):
          </label>
          <input
            className="popup__input"
            id="last-name"
            type="text"
            name="last-name"
            onChange={(event) => handleInput(event)}
          />
          <label className="popup__label" htmlFor="job-position">
            Your job position (optional):
          </label>
          <input
            className="popup__input"
            id="job-position"
            type="text"
            name="job-position"
            onChange={(event) => handleInput(event)}
          />
          <label className="popup__label" htmlFor="job-position">
            Label:
          </label>
          <div className="popup__input-image-wrap">
            <input
              className="popup__input popup__input_image"
              id="popup-input-image"
              type="file"
              name="image"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="popup-input-image" className="popup__button popup__label-image">
              Button
            </label>
          </div>
          <div className="popup__avatar popup__avatar_name" style={{ background: avatar ? `url(${avatar})` : '' }}>
            {avatar ? '' : createAvatarName()}
          </div>
          <div className="popup__btn-wrap">
            <button
              className="popup__button popup__button_main"
              type="submit"
              onClick={(event) => handleConfirm(event)}
            >
              Confirm
            </button>
            <button
              className="popup__button popup__button_main popup__button_cancel"
              type="reset"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
