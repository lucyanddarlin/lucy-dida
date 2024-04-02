import { createRouter, createWebHistory } from 'vue-router'
import { finishLoading, startLoading } from '@/composables/loadingBars'
import routes from './router'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
    startLoading()
  })

  router.afterEach(() => {
    finishLoading()
  })
}

let router: Router
export const setupRouter = async (app: App) => {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })
  setupRouterGuard(router)
  app.use(router)
  await router.isReady()
}
