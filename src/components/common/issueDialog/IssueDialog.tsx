import { Button, Dialog, DialogActions, DialogTitle, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import './issue-dialog.css';
import { Issue, IssuePriority } from '../../../model/Issue';

export interface IssueDialogProps {
  create: boolean
  open: boolean;
  onClose: (issue: Issue) => void;
  issue?: string
}

export default function IssueDialog(props: IssueDialogProps): JSX.Element {
  const [$name, setName] = useState<string>('');
  const [$link, setLink] = useState<string>('');
  const [$priority, setPriority] = useState<IssuePriority>(IssuePriority.LOW);

  const { onClose, open } = props;

  const handleClose = () => {
    const issue = {
      id: '',
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
    <DialogTitle className="issue-dialig-tittle" id="simple-dialog-title">
      {props.create ? 'Create issue' : 'Edit issue'}
    </DialogTitle>
    <TextField value={$name} id="name-basic" label="title" variant="outlined" onChange={nameOnChangeHandler} />
    <TextField value={$link} id="link-basic" label="link" variant="outlined" onChange={linkOnChangeHandler} />
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={$priority}
      onChange={priorityOnChangeHandler}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={IssuePriority.LOW}>LOW</MenuItem>
      <MenuItem value={IssuePriority.MIDDLE}>MIDDLE</MenuItem>
      <MenuItem value={IssuePriority.HIGHT}>HIGHT</MenuItem>
    </Select>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
}