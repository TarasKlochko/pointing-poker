export enum IssuePriority {
  LOW = 'Low priority',
  MIDDLE = 'Middle priority',
  HIGHT = 'Hight priority',
}

export interface Issue {
  id: number
  priority: IssuePriority
  name: string
  link: string
}