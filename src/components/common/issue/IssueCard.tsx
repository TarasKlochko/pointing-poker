import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { Issue } from '../../../model/Issue';
import { UserRole } from '../../../model/UserRole';
import { useCardsStyles } from '../../../styles/CardStyles';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-icon.svg';
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg';
import './issue-common.css';
import IssueDialog from '../issueDialog/IssueDialog';
import YesNoDialog from '../common-dialogs/YesNoDialog';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeIssue, upDateIssue } from '../../../slices/GameSlice';
import { Controller } from '../../../api/Controller';

export interface IssueCardProps {
  issue: Issue;
  userRole: UserRole;
  deleteIssueHandler:(issues: Issue[]) => void;
}

export default function IssueeCard(props: IssueCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const issues = useAppSelector((state) => state.game.room.issues);
  const room = useAppSelector((state) => state.game.room);
  const socket = useAppSelector((state) => state.socket.socket);

  const deleteContent = `Do you realy want to delete issue: ${props.issue.name} ?`;

  const deleteTitle = 'Delete issue';

  const classes = useCardsStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const upDateIssueHandler = (issue: Issue) => {
    setOpen(false);
    dispatch(upDateIssue(issue));
  };

  const noUpDateIssueHandler = () => {
    setOpen(false);
  };

  const deleteDialogOpenHandler = () => {
    setDeleteOpen(true);
  };

  const deleteDialogYesHandler = () => {
    setDeleteOpen(false);
    const issues1: Issue[] = [];
    issues.forEach((issue, index) => {
      if (props.issue.id !== issue.id) {
        issues1.push(issue);
      }
    });
    props.deleteIssueHandler(issues1);
    //  dispatch(removeIssue(props.issue));
  };

  
  const deleteDialogNoHandler = () => {
    setDeleteOpen(false);
  };

  return (
    <Card className={`${classes.createIssueButton} ${classes.issueCardWrapper} margin-auto`}>
      <CardContent className={classes.cardContent} style={{ padding: 0 }}>
        <Typography className={classes.currentFont}>{props.issue.id === '1' ? 'Current' : ''}</Typography>
        <Typography className={classes.cardFont}>{props.issue.name}</Typography>
        <Typography className={classes.priorityFont}>{props.issue.priority}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-controls="change-issue-name" aria-haspopup="true" onClick={handleClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-controls="change-issue-name" aria-haspopup="true" onClick={deleteDialogOpenHandler}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <IssueDialog
        noHandler={noUpDateIssueHandler}
        issue={props.issue}
        open={open}
        onClose={upDateIssueHandler}
      ></IssueDialog>
      <YesNoDialog
        content={deleteContent}
        open={deleteOpen}
        yesClickHandle={deleteDialogYesHandler}
        noClickHandle={deleteDialogNoHandler}
        title={deleteTitle}
      ></YesNoDialog>
    </Card>
  );
}
