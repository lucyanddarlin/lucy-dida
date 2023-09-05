import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { fetchAllTaskProject, fetchCreateProject } from '@/api'
import { useListProjectStore } from '../listProject'
import { useTaskSelectorStore } from '../taskSelector'
import type { CreateProjectResponse, ProjectResponse } from '@/types'

vi.mock('@/api')

let projectId = 0
const responseAllProject = (): Array<ProjectResponse> => [
  {
    id: '1',
    name: '清单',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  },
  {
    id: '2',
    name: '其他',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  },
  {
    id: '3',
    name: '其他2',
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  }
]

const responseNewProject = (name: string): CreateProjectResponse => {
  return {
    id: `${projectId++}`,
    name,
    createAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`
  }
}

vi.mocked(fetchAllTaskProject).mockImplementation(async () => {
  return await responseAllProject()
})

vi.mocked(fetchCreateProject).mockImplementation(async (name: string) => {
  return await responseNewProject(name)
})

describe('list project', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should get mock task projects and currentSelector should be right', async () => {
    const listProjectStore = useListProjectStore()
    const taskSelectorStore = useTaskSelectorStore()
    await listProjectStore.init()

    expect(taskSelectorStore.currentSelector!.id).toBe('1')
  })

  it('should create a new project', async () => {
    const listProjectStore = useListProjectStore()
    const taskSelectorStore = useTaskSelectorStore()
    await listProjectStore.init()
    const projectName = 'new project'
    await listProjectStore.createProject(projectName)

    expect(
      listProjectStore.projects[listProjectStore.projects.length - 1].name
    ).toBe(projectName)
    expect(taskSelectorStore.currentSelector!.name).toBe(projectName)
  })

  it('should not create a new project with a empty string', async () => {
    const listProjectStore = useListProjectStore()
    const projectName = ''
    const project = await listProjectStore.createProject(projectName)

    expect(project).toBe(undefined)
  })

  it('should find the target project with projectId', async () => {
    const listProjectStore = useListProjectStore()
    await listProjectStore.init()
    const taskSelectorStore = useTaskSelectorStore()
    const projectId = '1'
    listProjectStore.selectProject(projectId)

    expect(taskSelectorStore.currentSelector?.name).toBe('清单')
  })

  it('should find the target project with projectName', async () => {
    const listProjectStore = useListProjectStore()
    const taskSelectorStore = useTaskSelectorStore()

    await listProjectStore.init()
    const projectName = '清单'
    listProjectStore.selectProject(projectName)

    expect(taskSelectorStore.currentSelector?.id).toBe('1')
  })

  it('should check the source project is exist', async () => {
    const listProjectStore = useListProjectStore()
    await listProjectStore.init()

    const existProjectName = '清单'
    const unExistProjectName = 'not_exist'

    expect(listProjectStore.checkProjectIsExist(existProjectName)).toBe(true)
    expect(listProjectStore.checkProjectIsExist(unExistProjectName)).toBe(false)
  })
})
