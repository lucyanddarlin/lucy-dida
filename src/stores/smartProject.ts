import { defineStore } from 'pinia'
import { TaskSelectorType, TaskStatus } from '@/types/task'
import { type SmartProject, SmartProjectName } from '@/types'
import { useTaskSelectorStore } from './taskSelector'
function createSmartProject(id: string, name: string): SmartProject {
  return {
    id,
    name,
    type: TaskSelectorType.smartProject
  }
}

export const completeSmartProject = createSmartProject(
  '11',
  SmartProjectName.Complete
)
export const trashSmartProject = createSmartProject(
  '22',
  SmartProjectName.Trash
)

export const useSmartProjectStore = defineStore('smartProject', () => {
  const taskSelectorStore = useTaskSelectorStore()

  function selectProject(projectName: SmartProjectName) {
    if (projectName === SmartProjectName.Complete) {
      taskSelectorStore.setCurrentSelector(completeSmartProject)
    } else if (projectName === SmartProjectName.Trash) {
      taskSelectorStore.setCurrentSelector(trashSmartProject)
    }
  }

  return {
    selectProject
  }
})

/**
 * 获取对应 project 所在的任务
 * @param projectName
 * @returns
 */
export function loadSmartProjectTask(projectName: SmartProjectName) {
  const status =
    projectName === SmartProjectName.Complete
      ? TaskStatus.COMPLETE
      : TaskStatus.REMOVE
  // TODO: fetch all task

  return {
    status
  }
}
