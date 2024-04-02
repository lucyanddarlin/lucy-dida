import { sidebars } from '@/composables/settings/sider'
import Settings from '@/views/settings/index.vue'
import { RouteName } from './constants'
import type { RouteRecordRaw } from 'vue-router'

const SETTINGS_PATH = 'settings'

const subSettingPage = import.meta.glob(['/src/views/settings/Sub/**/**.vue'])
const subRoutes: Array<RouteRecordRaw> = sidebars.map((sidebar) => ({
  path: `/settings${sidebar.path}`,
  name: `Setting${sidebar.name}`,
  component:
    subSettingPage[`/src/views/settings/Sub/${sidebar.name}/index.vue`],
  meta: {
    title: sidebar.title,
  },
}))

export const SettingsRoute = {
  path: `/${SETTINGS_PATH}`,
  component: Settings,
  name: RouteName.Settings,
  children: subRoutes,
  redirect: subRoutes[0].path,
  meta: { title: '设置' },
} as RouteRecordRaw
