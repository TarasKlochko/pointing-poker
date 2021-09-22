import React from 'react';
import * as XLSX from 'xlsx';
import { useAppDispatch } from '../../../../../app/hooks';
import { Issue, IssuePriority } from '../../../../../model/Issue';
import { addIssue } from '../../../../../slices/GameSlice';
import './issueFromFile.css';

export default function IssueFromFile() {
  const dispatch = useAppDispatch();

  function createIssue(obj: string[]) {
    const issue: Issue = {
      id: '',
      priority: IssuePriority.LOW,
      name: '',
      link: '',
    };
    if (obj.length > 0) {
      [issue.name] = obj;
      issue.link = obj[2] || '';
      switch (obj[1].toLocaleLowerCase()) {
        case 'low':
          issue.priority = IssuePriority.LOW;
          break;
        case 'middle':
          issue.priority = IssuePriority.MIDDLE;
          break;
        case 'hight':
          issue.priority = IssuePriority.HIGHT;
          break;
        default:
          issue.priority = IssuePriority.LOW;
      }
      dispatch(addIssue(issue));
    }
  }

  function handleDownloadIssues(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.currentTarget?.files![0] as File;
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const dataParse: [string, string, string][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      dataParse.map((obj) => createIssue(obj));
    };
    reader.readAsBinaryString(file);
  }

  return (
    <label className="issue-from-file__label" htmlFor="issue-from-file">
      Download issues
      <input
        className="issue-from-file__input"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        id="issue-from-file"
        onChange={(event) => handleDownloadIssues(event)}
      />
    </label>
  );
}
