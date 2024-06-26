import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllProjects, fetchCreateProject } from '@/api'
import { TaskSelectorType } from '@/types/task'
import { isEmptyString, isNull } from '@/utils'
import { useTaskSelectorStore } from './taskSelector'
import type { ListProject, ProjectResponse } from '@/types'

export const useListProjectStore = defineStore('listProject', () => {
  const taskSelectorStore = useTaskSelectorStore()
  const projects = ref<Array<ListProject>>([])

  /**
   * 初始化 project list
   */
  async function init() {
    const rawsProjects: Array<ProjectResponse> = await fetchAllProjects()
    projects.value = rawsProjects.map(
      (p) =>
        ({
          id: `${p._id}`,
          name: p.name,
          type: TaskSelectorType.listProject,
        } as ListProject)
    )
    taskSelectorStore.setCurrentSelector(projects.value[0])
  }

  /**
   * 根据 name 和 id 查找对应的 project
   * @param projectNameOrId
   * @returns
   */
  function findProject(
    projectNameOrId: ListProject['name']
  ): ListProject | undefined {
    return projects.value.find(
      (p) => p.id === projectNameOrId || p.name === projectNameOrId
    )
  }

  /**
   * 根据 project | projectName | projectId 设置对应的 currentProject
   * @param projectOrNameOrId
   */
  function selectProject(project: ListProject): void
  function selectProject(projectId: ListProject['id']): void
  function selectProject(projectName: ListProject['name']): void
  function selectProject(
    projectOrNameOrId: ListProject | ListProject['id']
  ): void {
    let project: ListProject | undefined
    if (typeof projectOrNameOrId === 'string') {
      project = findProject(projectOrNameOrId)
    } else {
      project = projectOrNameOrId
    }

    if (project) {
      taskSelectorStore.setCurrentSelector(project as ListProject)
    }
  }

  /**
   * 创建 project
   * @param name
   */
  async function createProject(name: string): Promise<ListProject | undefined> {
    if (isNull(name) || isEmptyString(name)) {
      return
    }
    const project = await fetchCreateProject(name)
    const nextProject = mapCreateProjectResponseToProject(project)
    projects.value.push(nextProject)
    selectProject(nextProject)
    return nextProject
  }

  /**
   * 根据参数 projectName 参数判断对应 project 是否存在
   * @param projectName
   */
  function checkProjectIsExist(projectName: ListProject['name']): boolean {
    return projects.value.some((p) => p.name === projectName)
  }

  return {
    projects,
    init,
    createProject,
    selectProject,
    checkProjectIsExist,
  }
})

/**
 * 将接口返回 project 数据进行转换
 * @param project
 * @returns
 */
function mapCreateProjectResponseToProject(
  project: ProjectResponse
): ListProject {
  return {
    id: project._id,
    name: project.name,
    type: TaskSelectorType.listProject,
  }
}
