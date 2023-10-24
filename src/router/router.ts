import Task from '@/views/task/index.vue'
import Login from '@/views/login/index.vue'

import { RouteName } from './constants'
import { SettingsRoute } from './settings'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/task',
    name: RouteName.Home
  },
  {
    path: '/task',
    name: RouteName.Task,
    component: Task
  },
  {
    path: '/login',
    name: RouteName.Login,
    component: Login
  },
  SettingsRoute
]

export default routes
