import type { SmartProjectName } from "."

export enum TaskSelectorType {
  listProject = 'listProject',
  smartProject = 'smartProject'
}

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
  REMOVE = 'remove'
}

export interface TaskListType {
  key: number
  icon: string
  title: `${SmartProjectName}`
  option?: string
}