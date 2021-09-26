
export interface MemberVote {
  status: MemberVoteStatus;
  currentIssue: number;
  memberVoteResult?: MemberVoteTicket[]; 
  chosenValue?: string;
  timer?: Timer;
}

export enum MemberVoteStatus {
  BEFORE_START = 'before start', 
  IN_PROGRESS = 'in progress',
  FINISHED = 'finished',
}

export interface MemberVoteTicket {
  userId: string;
  value: string;
}

export interface Timer {
  min: number; 
  sec: number; 
  start: boolean;
}