import { Issue, IssueStatistic } from "../model/Issue";

export class IssueUtil {
  public static getCurrentIssueStatistics(issues: Issue[], currentIssue: number): IssueStatistic[] | undefined {
      return issues[currentIssue].statistic;
  }
}