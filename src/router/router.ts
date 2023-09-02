import Home from '@/views/home/index.vue'
import Settings from '@/views/settings/index.vue'

import { RouteName } from './constants'
import type { RouteRecordRaw } from 'vue-router'

// TODO: async load component
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.Home,
    component: Home
  },
  {
    path: '/settings',
    name: RouteName.Settings,
    component: Settings
  }
]

export default routes
