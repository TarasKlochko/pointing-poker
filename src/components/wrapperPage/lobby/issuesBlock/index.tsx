import React from 'react';
import './issues.css';
import IssueeCard from "../../../common/issue/IssueCard";
import { Issue } from "../../../../model/Issue";
import { UserRole } from "../../../../model/UserRole";
import CreateIssueButton from "../../../common/issue/CreateIssueButton";
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addIssue } from '../../../../slices/GameSlice';

export interface IssuesBlockProps {
  issues: Issue[]
}

export default function IssuesBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  const issueItems: JSX.Element[] = [];

  for (let i = 0; i < game.room.issues.length; i++) {
    issueItems.push(<IssueeCard key={i} issue={game.room.issues[i]} userRole={UserRole.DEALER}></IssueeCard>)
  }

  const createIssueHandler = (issue: Issue): void => {
    dispatch(addIssue(issue));
  }

  return <div className="issues-block">
    <h5 className="common-title">Issues:</h5>
    <div className="common-card-block">
      {
        issueItems
      }
      <CreateIssueButton onClickHandler={createIssueHandler}></CreateIssueButton>
    </div>
  </div>
}