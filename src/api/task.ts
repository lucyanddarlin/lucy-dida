import axios from './axios'
import type { TaskResponse } from '@/types/task'
import type { CreateProjectResponse, ProjectResponse } from '@/types'

export const fetchAllTaskProject = () =>
  axios<Array<ProjectResponse>>({
    url: '/api/getAllProjects',
    method: 'GET',
  })

export const fetchCreateProject = (name: string) =>
  axios<CreateProjectResponse>({
    url: `/api/createProject?name=${name}`,
    method: 'get',
  })

export const fetchCreateTask = (title: string, projectId: string) =>
  axios<TaskResponse>({
    url: `/api/createTask?title=${title}&projectId=${projectId}`,
    method: 'get',
  })
