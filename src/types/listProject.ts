import type { TaskSelectorType } from './task'

export enum SmartProjectName {
  Complete = '已完成',
  Trash = '废纸篓',
}

interface CommonProject {
  id: string
  name: string
}

export interface ListProject extends CommonProject {
  type: TaskSelectorType.listProject
}

export interface SmartProject extends CommonProject {
  type: TaskSelectorType.smartProject
}

export type TaskSelector = ListProject | SmartProject
