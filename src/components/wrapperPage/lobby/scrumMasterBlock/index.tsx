import React from 'react';
import { Button } from '@material-ui/core';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';
import { useButtonStyles } from '../../../../styles/ButtonStyles';

const users: User[] = usersJSON

export default function ScrumMasterBlock(): JSX.Element {
  const classes = useButtonStyles();
  
  return <div className="scrum-master">
    <h5 className="scrum-master__title">Scram master:</h5>
    <MemberCard kind={MemberCardKind.SIMPLE} user={users[0]}></MemberCard>
    <div className="scrum-master__label-block">
      <h2 className="scrum-master__label-block__label">Label:</h2>
      <div className="scrum-master__label-block__input-block">
        <input type="text" className="scrum-master__label-block__input-block-input"></input>
        <Button className={classes.blueButton} onClick={(): void => console.log('click')}
          variant="contained" color="primary">Start Game</Button>
      </div>
    </div>
    <div className="scrum-master__start-exit-buttons-wrapper">
      <Button className={classes.blueButton} onClick={(): void => console.log('click')}
        variant="contained" color="primary">Start Game</Button>
      <Button className={`${classes.whiteButton} ${classes.marginButton}`} onClick={(): void => console.log('click')}
        variant="contained" color="primary">Start Game</Button>
    </div>
  </div>
}