import { Button, SvgIcon } from '@material-ui/core';
import React from 'react';
import { useCardsStyles } from '../../../styles/CardStyles';
import { ReactComponent as StarIcon } from '../../../assets/create.svg';
import './issue-common.css';

export interface CreateIssueButtonProps {
  onClickHandler: () => void;
}

export default function CreateIssueButton(props: CreateIssueButtonProps): JSX.Element {
  const classes = useCardsStyles();
  
  return <Button
    onClick={props.onClickHandler}
    variant="contained"
    className={`${classes.createIssueButton}`}
    endIcon={<SvgIcon className="icon" component={StarIcon} viewBox="0 0 56 56" ></SvgIcon>}
  > Create New Issue</Button>
}


