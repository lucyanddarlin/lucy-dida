import type { MockMethod } from 'vite-plugin-mock'

let projectId = 0
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
  }
] as MockMethod[]
