import { useRouter } from 'vue-router'
import { RouteName } from '@/router/constants'
import { getRouterInstance } from '@/router'

/**
 * 跳转 hooks
 */
export function useGoto() {
  const router = useRouter()

  function gotoHome() {
    router.push({ name: RouteName.HOME })
  }

  function gotoSetting() {
    router.push({ name: RouteName.SETTINGS })
  }

  function goToUserCenter() {
    router.push({ name: RouteName.LOGIN })
  }

  return {
    gotoHome,
    gotoSetting,
    goToUserCenter,
  }
}

export const GITHUB_URL = 'https://github.com/lucyanddarlin/lucy-dida'
/**
 * 打开 Github
 */
export function openGithub() {
  window.open(GITHUB_URL)
}

export function goToLogin() {
  const router = getRouterInstance()
  router.push({ name: RouteName.LOGIN })
}
