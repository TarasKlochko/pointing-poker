export enum IssuePriority {
  LOW = 'Low priority',
  MIDDLE = 'Middle priority',
  HIGHT = 'Hight priority',
}

export interface Issue {
  id: string
  priority: string
  name: string
}