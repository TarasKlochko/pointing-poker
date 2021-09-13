import React from 'react'
import { MemberCardKind } from '../../../model/MemberCardKind';
import { UserRole } from '../../../model/UserRole';
import ImageBlock from './ImageBlock';
import './member.css';
import playerLogoI from '../../../assets/playerLogo.svg';
import { User } from '../../../model/User';
import { useAppSelector } from '../../../app/hooks';

export interface MemberCardProps {
  user: User
  kind: MemberCardKind
  classList?: string[]
}

export default function MemberCard(props: MemberCardProps): JSX.Element {
  const user = useAppSelector((state) => state.user);
  let classes = ''

  if (props.classList) {
    props.classList.forEach((item) => {
      classes += ` ${item}`;
    })
  }

  const playerLogo: JSX.Element = <img src={playerLogoI} alt="player logo"
    className={props.kind === MemberCardKind.SIMPLE ? 'member__simple-user-logo' : 'member__chat-user-logo'}></img>
  const kickButton: JSX.Element = <button className={props.kind === MemberCardKind.SIMPLE ?
    'member__simple-user-kick-button' : 'member__chat-user-kick-button'} title="kick player">
    {playerLogo}
  </button>

  const simpleCard: JSX.Element = <div className={`simple-member-wrapper ${classes}`}>
    <ImageBlock kind={props.kind} name={props.user.name} surname={props.user.surname}
      image={props.user.image}></ImageBlock>
    <div className="member__simple-member-info-block">
      <div className="member-info-block__simple-current-user">{props.user.id === user.user.id ? 'IT`S YOU' : ''}</div>
      <div className="member-info-block__simple-name">{`${props.user.name} ${props.user.surname}`}</div>
      <div className="member-info-block__simple-position">{props.user.jobPosition}</div>
    </div>
    <div className="member__simple-image-wrapper">
      {props.user.role === UserRole.PLAYER && user.user.role !== UserRole.OBSERVER
        && props.user.id !== user.user.id ? kickButton : ''}
    </div>
  </div>

  const chatCard: JSX.Element = <div className={`chat-member-wrapper ${classes}`}>
    <ImageBlock kind={props.kind} name={props.user.name} surname={props.user.surname}
      image={props.user.image}></ImageBlock>
    <div className="member__chat-member-info-block">
      <div className="member-info-block__chat-current-user">IT`S YOU</div>
      <div className="member-info-block__chat-name">{`${props.user.name} ${props.user.surname}`}</div>
      <div className="member-info-block__chat-position">{props.user.jobPosition}</div>
    </div>
    <div className="member__chat-image-wrapper">
      {props.user.role === UserRole.PLAYER && user.user.role !== UserRole.OBSERVER
        && props.user.id !== user.user.id ? kickButton : ''}
    </div>
  </div>

  const card: JSX.Element = props.kind === MemberCardKind.SIMPLE ? simpleCard : chatCard

  return card
}