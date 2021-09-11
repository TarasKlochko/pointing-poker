import React from 'react';
import './issues.css';
import IssueeCard from "../../../common/issue/IssueCard";
import { Issue } from "../../../../model/Issue";
import { UserRole } from "../../../../model/UserRole";
import CreateIssueButton from "../../../common/issue/CreateIssueButton";

export interface IssuesBlockProps {
  issues: Issue[]
}

export default function IssuesBlock(props: IssuesBlockProps): JSX.Element {

  const issueItems: JSX.Element[] = [];

  for (let i = 0; i < props.issues.length; i++) {
    issueItems.push(<IssueeCard key={i} issue={props.issues[i]} userRole={UserRole.DEALER}></IssueeCard>)
  }

  return <div className="issues-block">
    <h5 className="common-title">Issues:</h5>
    <div className="common-card-block">
      {
        issueItems
      }
      <CreateIssueButton onClickHandler={(value: Issue) => console.log(value)}></CreateIssueButton>
    </div>
  </div>
}