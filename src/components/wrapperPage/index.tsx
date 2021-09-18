import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller } from '../../api/Controller';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GameState, Room } from '../../model/Room';
import { User } from '../../model/User';
import { setFullData, setMembers } from '../../slices/GameSlice';
import { setUser, ifKicked } from '../../slices/UserSlice';
import GamePage from './gamePage';
import LobbyPage from './lobby';
import ResultPage from './resultPage';

export default function WrapperPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);
  const history = useHistory();
  const socket = useAppSelector(state => state.socket.socket);

  if(user.kicked) history.push(`/`);

  let page: JSX.Element = <></>;
  switch (game.room.state) {
    case GameState.WAITING:
      page = <LobbyPage></LobbyPage>
      break;
    case GameState.PLAYING:
      page = <GamePage></GamePage>
      break;
    case GameState.RESULT:
      page = <ResultPage></ResultPage>
      break;
    default:
      page = <></>;
      break;
  }

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    const roomID = localStorage.getItem('roomID');
    if (userID !== null && roomID !== null) {
      if(user.user.id.length === 0) {
        Controller.getDataForReload(socket, roomID, userID).then(response => {
          dispatch(setUser(response.user!))
        })
      }
      if(game.room.roomID.length === 0) {
        Controller.getDataForReload(socket, roomID, userID).then(response => {
          const room: Room = {...response.roomObj!, members: response.users!};
          const dealer: User = response.dealer!;
          dispatch(setFullData({room, dealer}))
        })
      }
    }
  });

  useEffect(() => {
    socket.on("users", (users): void => {
      const usersO: User[] = users;
      console.log(usersO);
      dispatch(setMembers(usersO));
      dispatch(ifKicked(usersO));
    })
  }, [socket]);

  return <div>{page}</div>
}