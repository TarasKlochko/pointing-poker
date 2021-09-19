import { Issue } from "./Issue";
import { User } from "./User";

export interface MemberVote {
  status: MemberVoteStatus;
  currentIssue?: number;
  memberVoteResult?: MemberVoteTicket[]; 
  chosenValue?: string;
  timer?: Timer;
}

export enum MemberVoteStatus {
  BEFORE_START, IN_PROGRESS, FINISHED
}

export interface MemberVoteTicket {
  userId: string;
  value: string;
}

export interface Timer {
  min: string; 
  sec: string; 
  start: boolean;
}