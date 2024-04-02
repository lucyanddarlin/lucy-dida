import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCreateTask } from '@/api'
import {
  type Task,
  type TaskResponse,
  TaskSelectorType,
  TaskStatus,
} from '@/types/task'
import { useTaskSelectorStore } from './taskSelector'

export const useTaskStore = defineStore('taskStore', () => {
  const taskSelector = useTaskSelectorStore()

  const tasks = ref<Task[]>([])
  const currentActiveTask = ref<Task>()

  /**
   * 添加任务
   * @param title
   */
  async function addTask(title: string): Promise<Task | undefined> {
    if (!taskSelector.currentSelector?.id) {
      return
    }
    if (taskSelector.currentSelector.type === TaskSelectorType.smartProject) {
      return
    }
    const newRawTask = await fetchCreateTask(
      title,
      taskSelector.currentSelector!.id
    )
    const nextTask = mapTaskResponseToTask(newRawTask)

    tasks.value.unshift(nextTask)
    changeActiveTask(nextTask)
    return nextTask
  }

  /**
   * 更新任务标题
   */
  function updateTaskTitle(task: Task, newTitle: string) {
    const oldTitle = task.title
    if (oldTitle === newTitle) {
      return
    }
    // TODO: fetch update task api
    task.title = newTitle
  }

  /**
   * 完成任务
   */
  function completeTask(task: Task) {
    if (task.status !== TaskStatus.ACTIVE) return
    // TODO: fetch complete task api
    _removeTask(task)
    changeActiveTask(undefined)
  }

  /**
   * 根据 task 或者 taskId 更新当前的 task
   * @param taskOrTaskId
   */
  function changeActiveTask(taskId: Task['id']): void
  function changeActiveTask(task: Task | undefined): void
  function changeActiveTask(taskOrTaskId: Task | Task['id'] | undefined): void {
    let nextTask: Task | undefined
    if (typeof taskOrTaskId === 'string') {
      nextTask = tasks.value.find((t) => t.id === taskOrTaskId)
    } else {
      nextTask = taskOrTaskId
    }
    currentActiveTask.value = nextTask
  }

  /**
   * 移除任务
   */
  function _removeTask(task: Task) {
    tasks.value = tasks.value.filter((t) => t.id !== task.id)
  }

  return {
    tasks,
    currentActiveTask,
    addTask,
    updateTaskTitle,
    completeTask,
    changeActiveTask,
    _removeTask,
  }
})

function mapTaskResponseToTask(rawTask: TaskResponse): Task {
  return {
    id: rawTask.id,
    projectId: rawTask.projectId,
    title: rawTask.title,
    content: rawTask.content,
    status: rawTask.status,
    position: rawTask.position,
  }
}
