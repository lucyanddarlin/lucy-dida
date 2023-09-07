import { useRouter } from 'vue-router'
import { RouteName } from '@/router/constants'

/**
 * 跳转 hooks
 */
export function useGoto() {
  const router = useRouter()

  function gotoHome() {
    router.push({ name: RouteName.Home })
  }

  function gotoSetting() {
    router.push({ name: RouteName.Settings })
  }

  return {
    gotoHome,
    gotoSetting
  }
}

export const GITHUB_URL = 'https://github.com/lucyanddarlin/lucy-dida'
/**
 * 打开 Github
 */
export function openGithub() {
  window.open(GITHUB_URL)
}
