import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import { useButtonStyles } from '../../../../styles/ButtonStyles';
import { UserRole } from '../../../../model/UserRole';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeGameState, setName, setRoomId, setRoomState, setSettings } from '../../../../slices/GameSlice';
import { GameState, Room } from '../../../../model/Room';
import { Controller } from '../../../../api/Controller';
import YesNoDialog from '../../../common/common-dialogs/YesNoDialog';

export default function ScrumMasterBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const roomId = useAppSelector((state) => state.createGame.id)
  const user = useAppSelector((state) => state.user);
  const settings = useAppSelector((state) => state.gameSettings);
  const game = useAppSelector((state) => state.game);
  const socket = useAppSelector((state) => state.socket.socket);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [copyVisible, setCopyVisible] = useState<boolean>(false);
  const createGame = useAppSelector((state) => state.createGame);
  const classes = useButtonStyles();

  const adress = `http://localhost:3000/#/connect/${createGame.id}`;

  useEffect(() => {
    socket.on("cancelGame", () => {
      history.push(`/`);
    });
    socket.on("updatedRoom", (newRoom) => {
      console.log(newRoom);
      console.log('update');
      dispatch(setRoomState(newRoom));
    });
  }, [socket])



  const cancelGame = (): void => {
    Controller.deleteRoom(socket, roomId).then(response => {
      if (response.status !== 200) {
        console.log(response.message);
      }
    });
  }

  const copyHandler = (): void => {
    navigator.clipboard.writeText(adress)
    setCopyVisible(true);
    setTimeout((): void => {
      setCopyVisible(false);
    }, 1500);
  }

  const startGame = (): void => {
    dispatch(changeGameState(GameState.PLAYING));
    dispatch(setSettings(settings));
    const room: Room = {
      roomID: game.room.roomID,
      name: game.room.name,
      state: GameState.PLAYING,
      issues: game.room.issues,
      gameSettings: settings,
      members: game.room.members
    }
    Controller.updateRoom(socket, room);
  }

  const exitGame = (): void => {
    Controller.deleteUser(socket, user.user.id);
    setOpen(false);
    history.push(`/`);
  }

  const closeDialog = () => {
    setOpen(false);
  }

  const openDialog = () => {
    setOpen(true);
  }

  return <div className="scrum-master">
    <h5 className="scrum-master__title">Scram master:</h5>
    <MemberCard kind={MemberCardKind.SIMPLE} user={game.dealer}></MemberCard>
    {
      user.user.role === UserRole.DEALER ? <div className="scrum-master__label-block">
        <h2 className="scrum-master__label-block__label">Label:</h2>
        <div className="scrum-master__label-block__input-block">
          <h3 className="scrum-master__label-block__input-block-input">{adress}</h3>
          <Button className={`${classes.blueButton}`} onClick={copyHandler}
            variant="contained" color="primary">Copy</Button>
          <div className={`scrum-master__label-block__input-block-copied ${copyVisible ? '' : 'hidden'}`}>Copied!</div>
        </div>
      </div> : <div className="scrum-master__no-label-block"></div>
    }

    {
      <div className="scrum-master__start-exit-buttons-wrapper">
        {
          user.user.role === UserRole.DEALER ?
            <Button className={classes.blueButton} onClick={startGame}
              variant="contained" color="primary">Start Game</Button>
            : <div></div>
        }
        {
          user.user.role === UserRole.DEALER ? <Button className={`${classes.whiteButton} ${classes.marginButton}`}
            onClick={cancelGame}
            variant="contained" color="primary">Cancel Game</Button> :
            <Button className={`${classes.whiteButton} ${classes.marginButton}`}
              onClick={openDialog} variant="contained" color="primary">Exit</Button>
        }
      </div>
    }
    <YesNoDialog content={`Do you really want to exit game?`} open={open}
      yesClickHandle={exitGame} noClickHandle={closeDialog}
      title={'Exit game?'}></YesNoDialog>
  </div>
}
