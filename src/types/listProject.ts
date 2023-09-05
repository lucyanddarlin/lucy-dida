import type { TaskSelectorType } from './task'

export interface ProjectResponse {
  id: string
  name: string
  createAt: string
  updatedAt: string
}

export interface ListProject {
  id: string
  name: string
  type: TaskSelectorType.listProject
}

export interface SmartProject {
  id: string
  name: string
  type: TaskSelectorType.smartProject
}

export type TaskSelector = ListProject | SmartProject

export interface CreateProjectResponse {
  id: string
  name: string
  createAt: string
  updatedAt: string
}
