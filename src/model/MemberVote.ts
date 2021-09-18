import { Issue } from "./Issue";
import { User } from "./User";

export interface MemberVote {
  status: MemberVoteStatus;
  currentIssue?: Issue;
  memberVoteTickets?: MemberVoteTicket[]; 
  timer?: Timer // if we really need this?
}

export enum MemberVoteStatus {
  BEFORE_START, IN_PROGRESS, FINISHED
}

export interface MemberVoteTicket {
  user: User;
  value: string;
  percentage: string;
}

export interface Timer {
  min: string; 
  sec: string; 
  start: boolean;
}