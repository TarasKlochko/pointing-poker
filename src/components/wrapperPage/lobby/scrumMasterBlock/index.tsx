import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import { useButtonStyles } from '../../../../styles/ButtonStyles';
import { UserRole } from '../../../../model/UserRole';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeGameState } from '../../../../slices/GameSlice';
import { GameState, Room } from '../../../../model/Room';
import { Controller } from '../../../../api/Controller';


export default function ScrumMasterBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const game = useAppSelector((state) => state.game);
  const roomId = useAppSelector((state) => state.createGame.id)
  const [copyVisible, setCopyVisible] = useState<boolean>(false);
  const createGame = useAppSelector((state) => state.createGame);
  const socket = useAppSelector((state) => state.socket.socket);
  const classes = useButtonStyles();

  const adress = `http://localhost:3000/#/connect/${createGame.id}`;

  const copyHandler = (): void => {
    navigator.clipboard.writeText(adress)
    setCopyVisible(true);
    setTimeout((): void => {
      setCopyVisible(false);
    }, 1500);
  }

  const startGame = (): void => {
    const room: Room = {
      roomID: game.room.roomID,
      gameSettings: game.room.gameSettings,
      issues: game.room.issues,
      members: game.room.members,
      name: game.room.name,
      state: GameState.PLAYING
    };
    console.log(room);
    Controller.updateRoom(socket, room).then(response => {
      if (response.status !== 200) {
        console.log(response.message);
      } else {
        console.log(response);
        // response consist only status 200
      }
    });
  }

  const cancelGame = (): void => {
    Controller.deleteRoom(socket, roomId).then(response => {
      if (response.status !== 200) {
        console.log(response.message);
      }
    });
  }

  useEffect(() => {
    socket.on("cancelGame", () => {
      console.log('Game was deleted!');
      // Here will be redirect on main page
    });
    socket.on("updatedRoom", (newRoom) => {
      console.log(newRoom);
      // Here will be save data in state and redirecxt on game page
    });
  }, [socket])

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
              onClick={(): void => console.log('click')}
              variant="contained" color="primary">Exit</Button>
        }
      </div>
    }
  </div>
}