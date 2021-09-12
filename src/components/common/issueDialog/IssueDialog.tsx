import { Button, Dialog, DialogActions, DialogTitle, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import './issue-dialog.css';
import { Issue, IssuePriority } from '../../../model/Issue';
import { useButtonStyles } from '../../../styles/ButtonStyles';

export interface IssueDialogProps {
  open: boolean;
  onClose: (issue: Issue) => void;
  noHandler: () => void;
  issue?: Issue;
}

export default function IssueDialog(props: IssueDialogProps): JSX.Element {
  const classes = useButtonStyles();

  let name: string;
  let link: string;
  let priority: IssuePriority;
  let $id: string
  if (props.issue) {
    name = props.issue.name;
    link = props.issue.link;
    priority = props.issue.priority
    $id = props.issue.id
  } else {
    name = '';
    link = '';
    priority = IssuePriority.LOW
    $id = ''
  }
  const [$name, setName] = useState<string>(name);
  const [$link, setLink] = useState<string>(link);
  const [$priority, setPriority] = useState<IssuePriority>(priority);

  const { onClose, open, noHandler } = props;

  const handleClose = () => {
    const issue = {
      id: $id,
      priority: $priority,
      name: $name,
      link: $link,
    }
    onClose(issue);
  };

  const nameOnChangeHandler = (e: React.FormEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setName(input);
  }

  const linkOnChangeHandler = (e: React.FormEvent) => {
    const input = (e.target as HTMLInputElement).value;
    setLink(input);
  }

  const priorityOnChangeHandler = (e: React.ChangeEvent<{ value: unknown }>) => {
    const input = (e.target as HTMLInputElement).value;
    switch (input) {
      case IssuePriority.LOW:
        setPriority(IssuePriority.LOW)
        break;
      case IssuePriority.MIDDLE:
        setPriority(IssuePriority.MIDDLE)
        break;
      case IssuePriority.HIGHT:
        setPriority(IssuePriority.HIGHT)
        break;
      default:
        setPriority(IssuePriority.LOW);
    }
  }

  return <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title">
      {props.issue ? 'Edit issue' : 'Create issue'}
    </DialogTitle>
    <div className="issue-dialog-input-wrapper">
      <TextField className="issue-dialog-input" value={$name} id="name-basic" label="title" variant="outlined"
        onChange={nameOnChangeHandler} ></TextField>
    </div>
    <div className="issue-dialog-input-wrapper">
      <TextField className="issue-dialog-input" value={$link} id="link-basic" label="link" variant="outlined"
        onChange={linkOnChangeHandler} />
    </div>
    <label className="issue-dialog-select-label issue-dialog-select-wrapper">
      Priority:
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={$priority}
        onChange={priorityOnChangeHandler}
      >
        <MenuItem value={IssuePriority.LOW}>LOW</MenuItem>
        <MenuItem value={IssuePriority.MIDDLE}>MIDDLE</MenuItem>
        <MenuItem value={IssuePriority.HIGHT}>HIGHT</MenuItem>
      </Select>
    </label>
    <DialogActions >
      <div className="issue-dialog-select-label issue-dialog-select-wrapper">
        <Button className={classes.blueButton} onClick={handleClose} color="primary" autoFocus>
          YES
        </Button>
        <Button className={classes.whiteButton} onClick={noHandler} color="primary" autoFocus>
          NO
        </Button>
      </div>
    </DialogActions>
  </Dialog>
}