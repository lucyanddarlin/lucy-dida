import axios from './axios'
import type { CreateProjectResponse, ProjectResponse } from '@/types'

export const fetchAllTaskProject = () =>
  axios<Array<ProjectResponse>>({
    url: '/api/getAllProjects',
    method: 'GET'
  })

export const fetchCreateProject = (name: string) =>
  axios<CreateProjectResponse>({
    url: `/api/createProject?name=${name}`,
    method: 'get'
  })
