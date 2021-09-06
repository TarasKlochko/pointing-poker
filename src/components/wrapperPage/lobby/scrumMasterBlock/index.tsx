import React from 'react';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import SimpleBlueButton from '../../../common/buttons/SimpleButton';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';

const users: User[] = usersJSON

export default function ScrumMasterBlock(): JSX.Element {
  return <div className="scrum-master">
    <h5 className="scrum-master__title">Scram master:</h5>
    <MemberCard kind={MemberCardKind.SIMPLE} user={users[0]}></MemberCard>
    <div className="scrum-master__label-block">
      <h2 className="scrum-master__label-block__label">Label:</h2>
      <div className="scrum-master__label-block__input-block">
        <input type="text" className="scrum-master__label-block__input-block-input"></input>
        <SimpleBlueButton classList={['simple-blue-button']} text={'Button'}
          onClickHandler={(): void => console.log()}></SimpleBlueButton>
      </div>
    </div>
    <div className="scrum-master__start-exit-buttons-wrapper">
      <SimpleBlueButton classList={['simple-blue-button']} text={'Start Game'}
        onClickHandler={(): void => console.log()}></SimpleBlueButton>
      <SimpleBlueButton classList={['simple-white-button', 'scrum-master__start-exit-buttons__cancel']}
        text={'Cancel Game'}
        onClickHandler={(): void => console.log()}></SimpleBlueButton>
    </div>
  </div>
}