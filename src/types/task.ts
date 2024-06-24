import type { SmartProjectName } from '.'

export enum TaskSelectorType {
  listProject = 'listProject',
  smartProject = 'smartProject',
}

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'complete',
  REMOVED = 'remove',
}

export interface TaskListType {
  key: number
  icon: string
  title: `${SmartProjectName}`
  option?: string
}

export interface Task {
  id: string
  title: string
  status: TaskStatus
  content: string
  projectId: string
  position: number
}

export interface TaskResponse {
  id: string
  title: string
  content: string
  status: TaskStatus
  projectId: string
  position: number
  createAt: string
  updatedAt: string
}
