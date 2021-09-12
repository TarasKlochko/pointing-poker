import React from 'react';
import './lobby.css';
import MembersBlock from './membersBlock';
import ScrumMasterBlock from './scrumMasterBlock';
import IssuesBlock from './issuesBlock';
import SettingsBlock from './settingsBlock';
import CardBlock from './cardBlock';
import { UserRole } from '../../../model/UserRole';
import LobbyName from './lobbyName/LobbyName';
import { useAppSelector } from '../../../app/hooks';

export default function LobbyPage(): JSX.Element {
  const game = useAppSelector((state) => state.game);

  const currentUser = game.room.members[0];

  return <div className="lobby-page">
    <div className="lobby-page-wrapper">
      <LobbyName
        name={'Lobby name'}></LobbyName>
      <ScrumMasterBlock></ScrumMasterBlock>
      <MembersBlock members={game.room.members}></MembersBlock>
      {
        currentUser.role === UserRole.DEALER ? <div>
          <IssuesBlock></IssuesBlock>
          <SettingsBlock></SettingsBlock>
          <CardBlock></CardBlock>
        </div> : <div></div>
      }
    </div>
  </div>
}