import { IconButton } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ReactComponent as EditIcon } from '../../../../assets/pencil.svg';
import './lobby-name.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';
import { UserRole } from '../../../../model/UserRole';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setRoomName } from '../../../../slices/GameSlice';
import { Controller } from '../../../../api/Controller';

const users: User[] = usersJSON;

const currentUser = users[0];

export default function LobbyName(): JSX.Element {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.game.room.name);
  const room = useAppSelector(state => state.game.room);
  const user = useAppSelector(state => state.user.user);
  const socket = useAppSelector(state => state.socket.socket);

  const [nameState, setName] = useState(name);

  useLayoutEffect(() => {
    const handleFocus = (): void => {
      inputEl.current?.classList.add("active")
    }

    const handleBlur = (): void => {
      inputEl.current?.classList.remove("active")
    }
    inputEl.current?.addEventListener("focus", handleFocus)
    inputEl.current?.addEventListener("blur", handleBlur)

    return () => {
      inputEl.current?.removeEventListener("focus", handleFocus)
      inputEl.current?.removeEventListener("blur", handleBlur)
    }

  }, [])

  const onButtonClick = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

  const onChangeHandler = (e: React.FormEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setName(input);
  }

  const saveNameHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(setRoomName(nameState));
    }
  }

  useEffect(() => {
    Controller.updateRoom(socket, room).then(response => {
      if (response.status !== 200) {
        console.log(response);
      }
    })
  }, [name]);

  const dealerEl = <div className="lobby-name">
    <input value={nameState} ref={inputEl} type="text"
      onChange={onChangeHandler}
      onKeyPress={saveNameHandler}
      className={`lobby-name__name`}></input>
    {user.role === UserRole.DEALER && <IconButton onClick={onButtonClick}>
      <EditIcon />
    </IconButton>}
  </div>

  const othersEl = <div className="lobby-name">
    <h3 className="lobby-name__name lobby-name__others">{name}</h3>
  </div>

  const resEl = currentUser.role === UserRole.DEALER? dealerEl : othersEl
  return resEl
}