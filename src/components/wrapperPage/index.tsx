import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { GameState } from '../../model/Room';
import GamePage from './gamePage';
import LobbyPage from './lobby';
import ResultPage from './resultPage';

export default function WrapperPage(): JSX.Element {
  const game = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);
  const history = useHistory();

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
      <LobbyPage></LobbyPage>
  }

  return <div>{page}</div>
}