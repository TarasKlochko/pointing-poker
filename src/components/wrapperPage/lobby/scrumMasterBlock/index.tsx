import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { MemberCardKind } from '../../../../model/MemberCardKind';
import MemberCard from '../../../common/memberCard';
import './scrum-master.css';
import usersJSON from '../../../../properties/users.json';
import { User } from '../../../../model/User';
import { useButtonStyles } from '../../../../styles/ButtonStyles';
import { UserRole } from '../../../../model/UserRole';

const users: User[] = usersJSON

const currentUser = users[0];

export default function ScrumMasterBlock(): JSX.Element {
  const [copyVisible, setCopyVisible] = useState<boolean>(false);
  const link = 'xdcfgvgthbnjymikk'
  const classes = useButtonStyles();

  const copyHandler = (): void => {
    navigator.clipboard.writeText(link)
    setCopyVisible(true);
    setTimeout((): void => {
      setCopyVisible(false);
    }, 1500);
  }

  return <div className="scrum-master">
    <h5 className="scrum-master__title">Scram master:</h5>
    <MemberCard kind={MemberCardKind.SIMPLE} user={currentUser}></MemberCard>
    {
      currentUser.role === UserRole.DEALER ? <div className="scrum-master__label-block">
        <h2 className="scrum-master__label-block__label">Label:</h2>
        <div className="scrum-master__label-block__input-block">
          <h3 className="scrum-master__label-block__input-block-input">{link}</h3>
          <Button className={`${classes.blueButton}`} onClick={copyHandler}
            variant="contained" color="primary">Copy</Button>
          <div className={`scrum-master__label-block__input-block-copied ${copyVisible ? '' : 'hidden'}`}>Copied!</div>
        </div>
      </div> : <div className="scrum-master__no-label-block"></div>
    }

    {
      <div className="scrum-master__start-exit-buttons-wrapper">
        {
          currentUser.role === UserRole.DEALER ?
            <Button className={classes.blueButton} onClick={(): void => console.log('click')}
              variant="contained" color="primary">Start Game</Button>
            : <div></div>
        }
        {
          currentUser.role === UserRole.DEALER ? <Button className={`${classes.whiteButton} ${classes.marginButton}`}
            onClick={(): void => console.log('click')}
            variant="contained" color="primary">Cancel Game</Button> :
            <Button className={`${classes.whiteButton} ${classes.marginButton}`}
              onClick={(): void => console.log('click')}
              variant="contained" color="primary">Exit</Button>
        }
      </div>
    }
  </div>
}