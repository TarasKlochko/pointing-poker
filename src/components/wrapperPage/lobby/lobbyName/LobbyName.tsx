import { IconButton, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../../../assets/pencil.svg';
import './lobby-name.css';

export interface LobbyNameProps {
  name: string
}

export default function LobbyName(props: LobbyNameProps): JSX.Element {
  const [name, setName] = useState<string>(props.name);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const changeHandler = (e: React.ChangeEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setName(input);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div className="lobby-name">
    <h2 className="lobby-name__name">{name}</h2>
    <IconButton aria-controls="change-issue-name" aria-haspopup="true" onClick={handleClick}>
      <EditIcon />
    </IconButton>
    <Menu
      id="change-issue-name"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem><input onChange={changeHandler} value={name}></input></MenuItem>
    </Menu>
  </div>
}