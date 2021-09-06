import React from 'react';
import { User } from '../../../model/User';
import './lobby.css';
import MembersBlock from './membersBlock';
import ScrumMasterBlock from './scrumMasterBlock';
import usersJSON from '../../../properties/users.json';

const users: User[] = usersJSON

export default function LobbyPage(): JSX.Element {
  return <div className="lobby-page">
    <div className="lobby-page-wrapper">
      <ScrumMasterBlock></ScrumMasterBlock>
      <MembersBlock members={users}></MembersBlock>
    </div>
  </div>
}