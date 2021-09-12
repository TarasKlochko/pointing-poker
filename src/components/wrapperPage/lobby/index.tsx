import React from 'react';
import { User } from '../../../model/User';
import './lobby.css';
import MembersBlock from './membersBlock';
import ScrumMasterBlock from './scrumMasterBlock';
import usersJSON from '../../../properties/users.json';
import issuesJSON from '../../../properties/issues.json';
import IssuesBlock from './issuesBlock';
import SettingsBlock from './settingsBlock';
import CardBlock from './cardBlock';
import { UserRole } from '../../../model/UserRole';
import LobbyName from './lobbyName/LobbyName';
import { Issue } from '../../../model/Issue';

const users: User[] = usersJSON

const issues: Issue[] = issuesJSON

const currentUser = users[0]

export default function LobbyPage(): JSX.Element {

  return <div className="lobby-page">
    <div className="lobby-page-wrapper">
      <LobbyName
        name={'Lobby name'}></LobbyName>
      <ScrumMasterBlock></ScrumMasterBlock>
      <MembersBlock members={users}></MembersBlock>
      {
        currentUser.role === UserRole.DEALER ? <div>
          <IssuesBlock issues={issues}></IssuesBlock>
          <SettingsBlock></SettingsBlock>
          <CardBlock></CardBlock>
        </div> : <div></div>
      }
    </div>
  </div>
}