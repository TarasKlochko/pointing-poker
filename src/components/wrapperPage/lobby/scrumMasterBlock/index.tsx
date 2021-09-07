import React from 'react';
import { Button } from '@material-ui/core';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';
import { useButtonStyles } from '../../../../styles/ButtonStyles';
import { UserRole } from '../../../../model/UserRole';

const users: User[] = usersJSON

const currentUser = users[1];

export default function ScrumMasterBlock(): JSX.Element {
  const classes = useButtonStyles();

  return <div className="scrum-master">
    <h5 className="scrum-master__title">Scram master:</h5>
    <MemberCard kind={MemberCardKind.SIMPLE} user={currentUser}></MemberCard>
    <div className="scrum-master__label-block">
      <h2 className="scrum-master__label-block__label">Label:</h2>
      <div className="scrum-master__label-block__input-block">
        <input type="text" className="scrum-master__label-block__input-block-input"></input>
        <Button className={classes.blueButton} onClick={(): void => console.log('click')}
          variant="contained" color="primary">Button</Button>
      </div>
    </div>
    <div className="scrum-master__start-exit-buttons-wrapper">
      {
        currentUser.role === UserRole.DEALER? 
          <Button className={classes.blueButton} onClick={(): void => console.log('click')}
            variant="contained" color="primary">Start Game</Button> : <div></div>
      }
      <Button className={`${classes.whiteButton} ${classes.marginButton}`} onClick={(): void => console.log('click')}
        variant="contained" color="primary">Cancel Game</Button>
    </div>
  </div>
}