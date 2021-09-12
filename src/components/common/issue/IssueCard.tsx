import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Issue } from '../../../model/Issue';
import { UserRole } from '../../../model/UserRole';
import { useCardsStyles } from '../../../styles/CardStyles';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-icon.svg';
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg';
import './issue-common.css';

export interface IssueCardProps {
  issue: Issue
  userRole: UserRole
}

export default function IssueeCard(props: IssueCardProps): JSX.Element {
  const [name, setName] = useState<string>(props.issue.name);
  const changeHandler = (e: React.ChangeEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setName(input);
  }

  const classes = useCardsStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  };

  const handleClose = () => {
  };

  return <Card className={`${classes.createIssueButton} ${classes.issueCardWrapper} margin-auto`}>
    <CardContent className={classes.cardContent}>
      <Typography className={classes.currentFont}>
        {props.issue.id === '1' ? 'Current' : ''}
      </Typography>
      <Typography className={classes.cardFont}>
        {name}
      </Typography>
      <Typography className={classes.priorityFont}>
        {props.issue.priority}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton aria-controls="change-issue-name" aria-haspopup="true" onClick={handleClick}>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
}