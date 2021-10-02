import React, { useEffect, useState } from 'react';
import './issues.css';
import IssueeCard from '../../../common/issue/IssueCard';
import { Issue } from '../../../../model/Issue';
import { UserRole } from '../../../../model/UserRole';
import CreateIssueButton from '../../../common/issue/CreateIssueButton';
import { useAppSelector } from '../../../../app/hooks';
import IssueFromFile from './issueFromFile';
import { Controller } from '../../../../api/Controller';

export interface IssuesBlockProps {
  issues: Issue[];
}

export default function IssuesBlock(): JSX.Element {
  const room = useAppSelector((state) => state.game.room);
  const socket = useAppSelector((state) => state.socket.socket);
  const [issues, setIssues] = useState(room.issues);
  const issueItems: JSX.Element[] = [];

  const deleteDialogYesHandler = (issuesProps: Issue[]) => {
    // setDeleteOpen(false);
    // const issues1: Issue[] = [];
    // issues.forEach((issue, index) => {
    //   if (props.issue.id !== issue.id) {
    //     issues1.push(issue);
    //   }
    // });
    Controller.updateIssues(socket, room.roomID, issuesProps);
    //  dispatch(removeIssue(props.issue));
  };

  for (let i = 0; i < issues.length; i++) {
    issueItems.push(
      <IssueeCard
        deleteIssueHandler={deleteDialogYesHandler}
        key={i}
        issue={issues[i]}
        userRole={UserRole.DEALER}
      ></IssueeCard>,
    );
  }

  const createIssueHandler = (issue: Issue) => {
    setIssues([...issues, issue]);
  };

  useEffect(() => {
    if (JSON.stringify(issues) !== JSON.stringify(room.issues)) {
      Controller.updateIssues(socket, room.roomID, issues).then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
        }
      });
    }
  }, [issues]);

  return (
    <div className="issues-block">
      <h5 className="common-title">Issues:</h5>
      <div className="common-card-block">
        {issueItems}
        <CreateIssueButton onClickHandler={createIssueHandler}></CreateIssueButton>
        <IssueFromFile />
      </div>
    </div>
  );
}
