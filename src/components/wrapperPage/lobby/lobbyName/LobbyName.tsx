import { IconButton } from '@material-ui/core';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { ReactComponent as EditIcon } from '../../../../assets/pencil.svg';
import './lobby-name.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';
import { UserRole } from '../../../../model/UserRole';

const users: User[] = usersJSON;

const currentUser = users[0];

export interface LobbyNameProps {
  name: string
}

export default function LobbyName(props: LobbyNameProps): JSX.Element {
  const inputEl = useRef<HTMLInputElement>(null);

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

  const [name, setName] = useState<string>(props.name);

  const onChangeHandler = (e: React.FormEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setName(input);
  }

  const dealerEl = <div className="lobby-name">
    <input value={name} ref={inputEl} type="text"
      onChange={onChangeHandler}
      className={`lobby-name__name`}></input>
    <IconButton onClick={onButtonClick}>
      <EditIcon />
    </IconButton>
  </div>

  const othersEl = <div className="lobby-name">
    <h3 className="lobby-name__name lobby-name__others">{name}</h3>
  </div>

  const resEl = currentUser.role === UserRole.DEALER? dealerEl : othersEl
  return resEl
}