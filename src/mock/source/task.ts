import { title } from 'node:process'
import { TaskStatus } from '@/types/task'
import type { TaskResponse } from '@/types/task'
import type { MockMethod } from 'vite-plugin-mock'

let projectId = 0
let taskId = 0
export default [
  {
    url: '/api/getAllProjects',
    method: 'get',
    response: () => [
      {
        id: 1,
        name: '节点一',
        createAt: `${Date.now()}`,
        updatedAt: `${Date.now()}`
      },
      {
        id: 2,
        name: '节点二',
        createAt: `${Date.now()}`,
        updatedAt: `${Date.now()}`
      },
      {
        id: 3,
        name: '节点三',
        createAt: `${Date.now()}`,
        updatedAt: `${Date.now()}`
      }
    ]
  },
  {
    url: '/api/createProject',
    method: 'get',
    response: ({ query }) => {
      return {
        id: `${projectId++}`,
        name: query.name
      }
    }
  },
  {
    url: '/api/createTask',
    method: 'get',
    response: ({ query }): TaskResponse => {
      return {
        id: `${taskId++}`,
        title: query.title,
        content: title,
        status: TaskStatus.ACTIVE,
        projectId: query.projectId,
        position: 0,
        createAt: `${Date.now()}`,
        updatedAt: `${Date.now()}`
      }
    }
  }
] as MockMethod[]
