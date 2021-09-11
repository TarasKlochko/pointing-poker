import { Button, SvgIcon } from '@material-ui/core';
import React from 'react';
import { useCardsStyles } from '../../../styles/CardStyles';
import { ReactComponent as StarIcon } from '../../../assets/create.svg';
import './issue-common.css';
import IssueDialog from '../issueDialog/IssueDialog';
import { Issue } from '../../../model/Issue';

export interface CreateIssueButtonProps {
  onClickHandler: (issue: Issue) => void;
}

export default function CreateIssueButton(props: CreateIssueButtonProps): JSX.Element {
  const classes = useCardsStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (issue: Issue) => {
    setOpen(false);
    props.onClickHandler(issue);
  };

  return <div>
    <Button
      onClick={handleClickOpen}
      variant="contained"
      className={`${classes.createIssueButton}`}
      endIcon={<SvgIcon className="icon" component={StarIcon} viewBox="0 0 56 56" ></SvgIcon>}
    > Create New Issue</Button>
    <IssueDialog create={true} open={open} onClose={handleClose}></IssueDialog>
  </div>

}


