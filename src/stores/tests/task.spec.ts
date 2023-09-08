import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type TaskResponse, TaskStatus } from '@/types/task'
import { fetchAllTaskProject, fetchCreateTask } from '@/api'
import { useTaskSelectorStore } from '../taskSelector'
import { useTaskStore } from '../task'
import { useListProjectStore } from '../listProject'
import { completeSmartProject } from '../smartProject'
import type { ProjectResponse } from '@/types'

vi.mock('@/api')

let taskId = 0
const responseAllProject = (): Array<ProjectResponse> => [
  {
    id: '1',
    name: '节点一',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  },
  {
    id: '2',
    name: '节点二',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  },
  {
    id: '3',
    name: '节点三',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  }
]

const responseNewTask = (title: string, projectId: string): TaskResponse => ({
  id: `${taskId++}`,
  title,
  status: TaskStatus.ACTIVE,
  content: title,
  projectId,
  position: 0,
  createAt: `${Date.now()}`,
  updatedAt: `${Date.now()}`
})

vi.mocked(fetchAllTaskProject).mockImplementation(async () => {
  return await responseAllProject()
})

vi.mocked(fetchCreateTask).mockImplementation(
  async (title: string, projectId: string) => {
    return await responseNewTask(title, projectId)
  }
)

describe('task', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    const listProjectStore = useListProjectStore()
    await listProjectStore.init()
  })
  it('should add a task', async () => {
    const taskStore = useTaskStore()
    const newTaskTitle = 'new task'

    const task = await taskStore.addTask(newTaskTitle)
    expect(task?.title).toBe(newTaskTitle)
    expect(taskStore.currentActiveTask).toEqual(task)
  })

  it('should not add a task to the smart project', async () => {
    const taskSelector = useTaskSelectorStore()
    taskSelector.setCurrentSelector(completeSmartProject)

    const taskStore = useTaskStore()
    const newTaskTitle = 'new task'
    const task = await taskStore.addTask(newTaskTitle)
    expect(task).toEqual(undefined)
    expect(taskStore.currentActiveTask).toEqual(undefined)
  })

  it('should update the target task', async () => {
    const taskStore = useTaskStore()
    const newTaskTitle = 'new task'
    const updateTaskTitle = 'update task'
    const task = await taskStore.addTask(newTaskTitle)

    taskStore.updateTaskTitle(task!, updateTaskTitle)
    expect(task?.title).toBe(updateTaskTitle)
  })

  it('should remove the target task', async () => {
    const taskStore = useTaskStore()
    const task1Title = 'task1'
    const task = await taskStore.addTask(task1Title)

    expect(taskStore.tasks.length).toBe(1)

    taskStore._removeTask(task!)

    expect(taskStore.tasks.length).toBe(0)
  })

  it('should complete the target task', async () => {
    const taskStore = useTaskStore()
    const task1Title = 'task1'
    const task = await taskStore.addTask(task1Title)

    taskStore.completeTask(task!)

    expect(taskStore.tasks.length).toBe(0)
  })
})
