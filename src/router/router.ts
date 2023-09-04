import Home from '@/views/home/index.vue'

import { RouteName } from './constants'
import { SettingsRoute } from './settings'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.Home,
    component: Home
  },
  SettingsRoute
]

export default routes
