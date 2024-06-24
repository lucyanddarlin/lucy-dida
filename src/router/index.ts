import { createRouter, createWebHistory } from 'vue-router'
import { finishLoading, startLoading } from '@/composables/loadingBars'
import { messageRedirectToSignIn } from '@/composables/message'
import { checkHaveToken } from '@/utils'
import routes from './router'
import { RouteName } from './constants'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
    startLoading()
  })

  router.afterEach(() => {
    finishLoading()
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some((r) => r.meta.requiresAuth)) {
      if (checkHaveToken()) next()
      else messageRedirectToSignIn(() => next({ name: RouteName.LOGIN }))
    } else {
      next()
    }
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

export function getRouterInstance() {
  return router
}
